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

    await Promise.all(highlights.map(async (highlight) => {
      const bookUser = await client.from("Books_NotionUsers")
        .select("*")
        .eq("userId", highlight.userId)
        .eq("bookId", highlight.bookId)
        .single();
      const book = await client.from("Book").select("*").eq(
        "id",
        highlight.bookId,
      ).single();

      if (bookUser.error || book.error) {
        console.warn({
          message: "Book not found",
          bookUser,
          book,
        });
        return;
      }

      if (!bookUser.data.notionPageId) {
        console.warn({
          message: "Notion page has been not created yet",
          bookUser,
        });

        return;
      }

      const notionHighlight = await saveHighlight(
        c.var.user,
        bookUser.data.notionPageId,
        book.data.asin,
        highlight,
      );

      await client.from("Highlight")
        .update({ notionPageId: notionHighlight.id })
        .eq("id", highlight.id);
    }));

    return c.json(
      {
        message: "highlight created",
        highlight: highlights,
      },
      201,
    );
  },
);

export { app as highlights };
