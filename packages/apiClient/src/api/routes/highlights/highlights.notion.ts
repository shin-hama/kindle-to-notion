import * as dntShim from "../../../_dnt.shims.js";
import { Client } from "@notionhq/client";
import { AuthenticatedUser, HighlightModel } from "../../../types/index.js";

export type CreateHighlightDTO = HighlightModel;

function convertColor(color: HighlightModel["color"]) {
  switch (color) {
    case "yellow":
      return "yellow_background";
    case "blue":
      return "blue_background";
    case "orange":
      return "orange_background";
    case "pink":
      return "pink_background";
    default:
      return "default";
  }
}

export async function saveHighlight(
  user: AuthenticatedUser,
  bookId: string,
  asin: string,
  highlight: CreateHighlightDTO,
) {
  try {
    const notion = new Client({
      auth: user.NotionSecret.access_token,
    });

    const result = await notion.pages.create({
      parent: {
        type: "database_id",
        database_id: user.NotionPage.highlights_db_id,
      },
      icon: {
        type: "emoji",
        emoji: "🏷️",
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
                content: highlight.location.toString(),
              },
            },
          ],
        },
        Page: {
          rich_text: [
            {
              text: {
                content: highlight.page?.toString() || "",
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
            start: highlight.created_at ??
              new Date().toISOString(),
          },
        },
        KindleLink: {
          url: `${
            dntShim.Deno.env.get("API_URL")
          }/kindle/open?asin=${asin}&location=${highlight.location}`,
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
          object: "block",
          quote: {
            rich_text: [
              {
                text: {
                  content: highlight.text,
                },
              },
            ],
            color: convertColor(highlight.color),
          },
        },
        {
          object: "block",
          paragraph: {
            rich_text: [
              {
                text: {
                  content: highlight.note ?? "",
                },
              },
            ],
          },
        },
      ],
    });

    return {
      id: result.id,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
}
