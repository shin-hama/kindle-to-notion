import { Injectable } from '@nestjs/common';
import { Client, isFullPage } from '@notionhq/client';
import { Highlight, HighlightColor } from '../models/highlight.model';
import { AuthenticatedUser } from '@/types';

export type CreateHighlightDTO = Omit<Highlight, 'book'>;

@Injectable()
export class HighlightRepository {
  constructor() {}

  private convertColor(color: HighlightColor) {
    switch (color) {
      case HighlightColor.YELLOW:
        return 'yellow_background';
      case HighlightColor.BLUE:
        return 'blue_background';
      case HighlightColor.ORANGE:
        return 'orange_background';
      case HighlightColor.PINK:
        return 'pink_background';
      default:
        return 'default';
    }
  }

  async exists(
    user: AuthenticatedUser,
    highlightId: string,
  ): Promise<Highlight | null> {
    try {
      const notion = new Client({
        auth: user.NotionSecret.access_token,
      });
      const response = await notion.databases.query({
        database_id: user.NotionPage.highlights_db_id,
        filter: {
          property: 'Id',
          rich_text: {
            equals: highlightId,
          },
        },
      });
      if (response.results.length === 0) {
        return null;
      }

      const highlight = response.results[0];

      // Check if it is a full page, if it is, it means a highlight is already saved
      return isFullPage(highlight)
        ? ({
            id: highlight.id,
            text:
              highlight.properties.Name.type === 'title'
                ? highlight.properties.Name.title[0].plain_text
                : '',
            color:
              highlight.properties.Color.type === 'select'
                ? (highlight.properties.Color.select.name as HighlightColor)
                : HighlightColor.YELLOW,
            location:
              highlight.properties.Location.type === 'rich_text'
                ? highlight.properties.Location.rich_text[0].plain_text
                : '',
            page:
              highlight.properties.Page.type === 'rich_text'
                ? highlight.properties.Page.rich_text[0].plain_text
                : '',
            createdDate:
              highlight.properties.CreatedDate.type === 'date'
                ? new Date(highlight.properties.CreatedDate.date.start)
                : new Date(),
            book: {
              id:
                highlight.properties.Book.type === 'relation'
                  ? highlight.properties.Book.relation[0]?.id
                  : '',
              title: 'Hello World',
              author: 'John Doe',
            },
          } satisfies Highlight)
        : null;
    } catch (e) {
      console.log(e);
    }
  }

  async save(
    user: AuthenticatedUser,
    bookId: string,
    asin: string,
    highlight: CreateHighlightDTO,
  ): Promise<Highlight> {
    try {
      const notion = new Client({
        auth: user.NotionSecret.access_token,
      });

      const result = await notion.pages.create({
        parent: {
          type: 'database_id',
          database_id: user.NotionPage.highlights_db_id,
        },
        icon: {
          type: 'emoji',
          emoji: '🏷️',
        },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: highlight.text,
                },
              },
            ],
          },
          Id: {
            rich_text: [
              {
                text: {
                  content: highlight.id,
                },
              },
            ],
          },
          Location: {
            rich_text: [
              {
                text: {
                  content: highlight.location,
                },
              },
            ],
          },
          Page: {
            rich_text: [
              {
                text: {
                  content: highlight.page,
                },
              },
            ],
          },
          Color: {
            select: {
              name: highlight.color,
            },
          },
          CreatedDate: {
            date: {
              start:
                highlight.createdDate?.toISOString() ??
                new Date().toISOString(),
            },
          },
          KindleLink: {
            url: `${process.env.API_URL}/kindle/open?asin=${asin}&location=${highlight.location}`,
          },
          Book: {
            relation: [
              {
                id: bookId,
              },
            ],
          },
        },
        children: [
          {
            object: 'block',
            quote: {
              rich_text: [
                {
                  text: {
                    content: highlight.text,
                  },
                },
              ],
              color: this.convertColor(highlight.color),
            },
          },
          {
            object: 'block',
            paragraph: {
              rich_text: [
                {
                  text: {
                    content: highlight.note ?? '',
                  },
                },
              ],
            },
          },
        ],
      });

      return {
        ...highlight,
        id: result.id,
        book: {
          id: bookId,
          title: 'Hello World',
          author: 'John Doe',
        },
      };
    } catch (e) {
      console.log(e);
    }
  }
}
