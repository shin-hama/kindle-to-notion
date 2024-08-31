import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@notionhq/client';
import { Book } from '@kino/shared/types';

@Injectable()
export class BookRepository {
  private notion: Client;

  constructor(private configService: ConfigService) {
    this.notion = new Client({
      auth: this.configService.get<string>('NOTION_TOKEN'),
    });
  }

  async saveBook(databaseId: string, book: Book): Promise<void> {
    try {
      this.notion.pages.create({
        parent: {
          type: 'database_id',
          database_id: databaseId,
        },
        icon: {
          type: 'emoji',
          emoji: '📕',
        },
        cover: {
          type: 'external',
          external: {
            url: book.imageUrl,
          },
        },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: book.title,
                },
              },
            ],
          },
          id: {
            rich_text: [
              {
                text: {
                  content: book.id,
                },
              },
            ],
          },
          asin: {
            rich_text: [
              {
                text: {
                  content: book.asin,
                },
              },
            ],
          },
          author: {
            rich_text: [
              {
                text: {
                  content: book.author,
                },
              },
            ],
          },
          URL: {
            url: book.url,
          },
          lastAnnotatedAt: {
            date: {
              start: book.updatedAt.toISOString(),
            },
          },
        },
      });
      console.log('Book saved:', book);
    } catch (e) {
      console.log(e);
    }
  }
}
