import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, isFullPage } from '@notionhq/client';
import { Book } from '../models/book.model';

@Injectable()
export class BookRepository {
  private notion: Client;

  constructor(private configService: ConfigService) {
    this.notion = new Client({
      auth: this.configService.get<string>('NOTION_TOKEN'),
    });
  }

  async exists(databaseId: string, bookId: string): Promise<boolean> {
    try {
      const response = await this.notion.databases.query({
        database_id: databaseId,
        filter: {
          property: 'id',
          rich_text: {
            equals: bookId,
          },
        },
      });
      if (response.results.length === 0) {
        return false;
      }

      const book = response.results[0];

      // Check if the book is a full page, if it is, it means a book is already saved
      return isFullPage(book);
    } catch (e) {
      console.log(e);
    }
  }

  async save(databaseId: string, book: Book): Promise<Book> {
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
        cover: book.imageUrl
          ? {
              type: 'external',
              external: {
                url: book.imageUrl,
              },
            }
          : undefined,
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
              start:
                book.lastAnnotatedAt?.toISOString() ?? new Date().toISOString(),
            },
          },
        },
      });

      return book;
    } catch (e) {
      console.log(e);
    }
  }
}
