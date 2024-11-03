import { Client, isFullPage } from "npm:@notionhq/client";
import { AuthenticatedUser, HighlightModel } from "../../types/index.ts";

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

async function exists(
  user: AuthenticatedUser,
  highlightId: string,
) {
  try {
    const notion = new Client({
      auth: user.NotionSecret.access_token,
    });
    const response = await notion.databases.query({
      database_id: user.NotionPage.highlights_db_id,
      filter: {
        property: "Id",
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
        text: highlight.properties.Name.type === "title"
          ? highlight.properties.Name.title[0].plain_text
          : "",
        color: highlight.properties.Color.type === "select"
          ? (highlight.properties.Color.select?.name as HighlightModel["color"])
          : "yellow",
        location: highlight.properties.Location.type === "rich_text"
          ? parseInt(highlight.properties.Location.rich_text[0].plain_text)
          : 0,
        page: highlight.properties.Page.type === "rich_text"
          ? parseInt(highlight.properties.Page.rich_text[0].plain_text)
          : 0,
        created_at: highlight.properties.CreatedDate.type === "date"
          ? new Date(highlight.properties.CreatedDate.date?.start ?? new Date())
            .toISOString()
          : new Date().toISOString(),
        bookId: "",
        userId: "",
        note: "",
      } satisfies HighlightModel)
      : null;
  } catch (e) {
    console.log(e);
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
            Deno.env.get("API_URL")
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
      ...highlight,
      id: result.id,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
}
