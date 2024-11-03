import { Hono } from "jsr:@hono/hono";
import { env } from "jsr:@hono/hono/adapter";
import { createClient } from "jsr:@supabase/supabase-js";
import {
  EnvSchema,
  HighlightModel,
  SupabaseDBTriggerdEvent,
} from "../../types/index.ts";
import { Database } from "../../types/database.types.ts";
import { UsersService } from "../users/users.service.ts";
import { saveHighlight } from "./highlights.notion.ts";

const app = new Hono();

app.post(
  "/",
  async (c) => {
    const { record: highlight } = await c.req.json() as SupabaseDBTriggerdEvent<
      HighlightModel
    >;
    console.log(highlight);
    const envResult = EnvSchema.safeParse(env(c));
    if (!envResult.success) {
      c.status(500);
      return c.text("Environment variables are not set");
    }
    const client = createClient<Database>(
      envResult.data.SUPABASE_URL,
      envResult.data.SUPABASE_SERVICE_ROLE_KEY,
    );

    const user = await new UsersService(envResult.data).find(highlight.userId);
    const bookUser = await client.from("Books_NotionUsers")
      .select("*")
      .eq("userId", highlight.userId)
      .eq("bookId", highlight.bookId)
      .single();
    const book = await client.from("Book").select("*").eq(
      "id",
      highlight.bookId,
    ).single();

    if (!user || bookUser.error || book.error) {
      console.warn({ message: "User or book not found", user, bookUser, book });
      return c.json({
        message: "User or book not found",
        user,
        bookUser,
        book,
      }, 500);
    }

    if (!bookUser.data.notionPageId) {
      console.warn({
        message: "Notion page has been not created yet",
        bookUser,
      });

      return c.text("Notion page has been not created yet", 400);
    }

    try {
      const notionHighlight = await saveHighlight(
        user,
        bookUser.data.notionPageId,
        book.data.asin,
        highlight,
      );

      return c.json(
        {
          message: "highlight created",
          highlight: notionHighlight,
        },
        201,
      );
    } catch (e) {
      console.error({
        message: "Error creating highlight",
        error: e,
        input: {
          user,
          bookUser,
          book,
          highlight,
        },
      });
      return c.json({ message: "Error creating highlight", error: e }, 500);
    }
  },
);

export { app as highlights };
