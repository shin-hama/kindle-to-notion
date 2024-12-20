import { Hono } from "npm:hono";
import { sessionValidator } from "../../middleware/session-validator.ts";
import { parseEnv } from "../../../lib/parseEnv.ts";
import { HighlightsService } from "./highlights.service.ts";
import { zValidator } from "npm:@hono/zod-validator";
import { z } from "npm:zod";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { Database } from "../../../types/database.types.ts";
import { saveHighlight } from "./highlights.notion.ts";

const HighlightColors = ["yellow", "blue", "pink", "orange"] as const;
const HighlightColor = z.enum(HighlightColors);
const CreateHighlightModelSchema = z.object({
  id: z.string(),
  color: HighlightColor,
  text: z.string(),
  location: z.number(),
  page: z.number().nullable(),
  note: z.string().nullable(),
});

const app = new Hono().post(
  "",
  sessionValidator,
  zValidator(
    "json",
    z.object({
      bookId: z.string(),
      asin: z.string(),
      highlights: z.array(CreateHighlightModelSchema),
    }),
  ),
  async (c) => {
    const { bookId, highlights: highlightsInput } = c.req.valid("json");
    console.log({ bookId, highlights: highlightsInput, user: c.var.user });

    try {
      const env = parseEnv(c);
      const client = createClient<Database>(
        env.SUPABASE_URL,
        env.SUPABASE_SERVICE_ROLE_KEY,
      );

      const service = new HighlightsService(client);

      const highlights = await service.createHighlights(
        highlightsInput.map((h) => ({
          ...h,
          bookId,
        })),
        c.var.user,
      );

      const bookUser = await client.from("Books_NotionUsers")
        .select("*")
        .eq("userId", c.var.user.id)
        .eq("bookId", bookId)
        .single();
      if (bookUser.error) {
        console.warn({
          message: "Book not found",
          bookUser,
        });

        return c.json({
          message: "Book not found",
        }, 500);
      }
      if (!bookUser.data.notionPageId) {
        console.warn({
          message: "Notion page has been not created yet",
          bookUser,
        });

        return c.json({
          message: "Notion page has been not created yet",
        }, 500);
      }

      for (const highlight of highlights) {
        if (!highlight.Book || highlight.notionPageId !== null) {
          continue;
        }
        try {
          const notionHighlight = await saveHighlight(
            c.var.user,
            bookUser.data.notionPageId,
            highlight.Book.asin,
            highlight,
          );

          await client.from("Highlight")
            .update({ notionPageId: notionHighlight.id })
            .eq("id", highlight.id);
        } catch {
          console.error(`Error saving highlight to Notion: ${highlight.id}`);
        }
      }

      return c.json(
        {
          message: "highlight created",
          highlight: highlights,
        },
        201,
      );
    } catch (error) {
      console.error(error);
      return c.json({ message: "Error creating highlight" }, 500);
    }
  },
);

export { app as highlights };
