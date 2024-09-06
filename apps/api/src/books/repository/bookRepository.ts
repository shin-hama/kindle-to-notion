import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, isFullPage } from '@notionhq/client';
import { Book } from '../models/book.model';
import { Logger } from '@nestjs/common';

@Injectable()
export class BookRepository {
  private notion: Client;

  constructor(private configService: ConfigService) {
    try {
      this.notion = new Client({
        auth: this.configService.get<string>('NOTION_TOKEN'),
      });
    } catch (e) {
      Logger.error(e);
    }
  }

  async exists(databaseId: string, bookId: string): Promise<Book | null> {
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
        return null;
      }

      const book = response.results[0];

      // Check if the book is a full page, if it is, it means a book is already saved
      return isFullPage(book)
        ? {
            id: book.id,
            title:
              book.properties.Name.type === 'title'
                ? book.properties.Name.title[0].plain_text
                : '',
            author:
              book.properties.author.type === 'rich_text'
                ? book.properties.author.rich_text[0].plain_text
                : '',
          }
        : null;
    } catch (e) {
      Logger.error(e);
    }
  }

  async save(databaseId: string, book: Book): Promise<Book> {
    try {
      const result = await this.notion.pages.create({
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

      return {
        ...book,
        id: result.id,
      };
    } catch (e) {
      Logger.error(e);
    }
  }
}
