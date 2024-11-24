import * as dntShim from "../../../_dnt.shims.js";
import { Client } from "@notionhq/client";
import { AuthenticatedUser, CreateBookDTO } from "../../../types/index.js";

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
          url: book.url || null,
        },
        LastAnnotatedAt: {
          date: {
            start: book.lastAnnotatedAt,
          },
        },
        KindleLink: {
          url: `${dntShim.Deno.env.get("API_URL")}/kindle/open?asin=${book.asin}`,
        },
      },
    });

    return {
      notionPageId: result.id,
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
};
