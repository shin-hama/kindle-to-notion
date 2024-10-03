import { Client } from "npm:@notionhq/client";
import { AuthenticatedUser, CreateBookDTO } from "../types/index.ts";

export const saveBook = async (
  user: AuthenticatedUser,
  book: CreateBookDTO,
) => {
  try {
    const notion = new Client({
      auth: user.NotionSecret.access_token,
    });
    const result = await notion.pages.create({
      parent: {
        type: "database_id",
        database_id: user.NotionPage.books_db_id,
      },
      icon: {
        type: "emoji",
        emoji: "📕",
      },
      cover: book.imageUrl
        ? {
          type: "external",
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
          url: book.url ?? null,
        },
        LastAnnotatedAt: {
          date: {
            start: book.lastAnnotatedAt,
          },
        },
        KindleLink: {
          url: `${Deno.env.get("API_URL")}/kindle/open?asin=${book.asin}`,
        },
      },
    });

    return {
      book,
      notionPageId: result.id,
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
};
