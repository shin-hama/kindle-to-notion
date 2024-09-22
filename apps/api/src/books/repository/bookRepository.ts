import { Injectable } from '@nestjs/common';
import { Client, isFullPage } from '@notionhq/client';
import { Book } from '../models/book.model';
import { Logger } from '@nestjs/common';
import { AuthenticatedUser } from '~/types';

@Injectable()
export class BookRepository {
  constructor() {}

  async exists(user: AuthenticatedUser, bookId: string): Promise<Book | null> {
    try {
      const notion = new Client({
        auth: user.NotionSecret.access_token,
      });

      const response = await notion.databases.query({
        database_id: user.NotionPage.books_db_id,
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

  async save(user: AuthenticatedUser, book: Book): Promise<Book> {
    try {
      const notion = new Client({
        auth: user.NotionSecret.access_token,
      });
      const result = await notion.pages.create({
        parent: {
          type: 'database_id',
          database_id: user.NotionPage.books_db_id,
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
          Id: {
            rich_text: [
              {
                text: {
                  content: book.id,
                },
              },
            ],
          },
          ASIN: {
            rich_text: [
              {
                text: {
                  content: book.asin,
                },
              },
            ],
          },
          Author: {
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
          LastAnnotatedAt: {
            date: {
              start:
                book.lastAnnotatedAt?.toISOString() ?? new Date().toISOString(),
            },
          },
          KindleLink: {
            url: `${process.env.API_URL}/kindle/open?asin=${book.asin}`,
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
