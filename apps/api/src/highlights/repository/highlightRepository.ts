import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, isFullPage } from '@notionhq/client';
import { Highlight, HighlightColor } from '../models/highlight.model';

export type CreateHighlightDTO = Omit<Highlight, 'book'>;

@Injectable()
export class HighlightRepository {
  private notion: Client;

  constructor(private configService: ConfigService) {
    this.notion = new Client({
      auth: this.configService.get<string>('NOTION_TOKEN'),
    });
  }

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
    databaseId: string,
    highlightId: string,
  ): Promise<Highlight | null> {
    try {
      const response = await this.notion.databases.query({
        database_id: databaseId,
        filter: {
          property: 'id',
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
              highlight.properties.color.type === 'select'
                ? (highlight.properties.color.select.name as HighlightColor)
                : HighlightColor.YELLOW,
            location:
              highlight.properties.location.type === 'rich_text'
                ? highlight.properties.location.rich_text[0].plain_text
                : '',
            page:
              highlight.properties.page.type === 'rich_text'
                ? highlight.properties.page.rich_text[0].plain_text
                : '',
            createdDate:
              highlight.properties.createdDate.type === 'date'
                ? new Date(highlight.properties.createdDate.date.start)
                : new Date(),
            book: {
              id:
                highlight.properties.book.type === 'relation'
                  ? highlight.properties.book.relation[0].id
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
    databaseId: string,
    bookId: string,
    highlight: CreateHighlightDTO,
  ): Promise<Highlight> {
    try {
      const result = await this.notion.pages.create({
        parent: {
          type: 'database_id',
          database_id: databaseId,
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
          id: {
            rich_text: [
              {
                text: {
                  content: highlight.id,
                },
              },
            ],
          },
          location: {
            rich_text: [
              {
                text: {
                  content: highlight.location,
                },
              },
            ],
          },
          page: {
            rich_text: [
              {
                text: {
                  content: highlight.page,
                },
              },
            ],
          },
          color: {
            select: {
              name: highlight.color,
            },
          },
          createdDate: {
            date: {
              start:
                highlight.createdDate?.toISOString() ??
                new Date().toISOString(),
            },
          },
          book: {
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
