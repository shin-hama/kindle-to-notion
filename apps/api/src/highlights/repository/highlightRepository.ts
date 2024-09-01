import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, isFullPage } from '@notionhq/client';
import { Highlight, HighlightColor } from '../models/highlight.model';

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

  async exists(databaseId: string, highlightId: string): Promise<boolean> {
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
        return false;
      }

      const highlight = response.results[0];

      // Check if it is a full page, if it is, it means a highlight is already saved
      return isFullPage(highlight);
    } catch (e) {
      console.log(e);
    }
  }

  async save(databaseId: string, highlight: Highlight): Promise<Highlight> {
    try {
      this.notion.pages.create({
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

      return highlight;
    } catch (e) {
      console.log(e);
    }
  }
}