import { Hono } from "npm:hono";
import { sessionValidator } from "../../middleware/session-validator.ts";
import { BooksService } from "./books.service.ts";
import { parseEnv } from "../../../lib/parseEnv.ts";
import { zValidator } from "npm:@hono/zod-validator";
import { z } from "npm:zod";
import { saveBook } from "./books.notion.ts";
import { Database } from "../../../types/database.types.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const CreateBookModel = z.object({
  asin: z.string(),
  author: z.string(),
  title: z.string(),
  imageUrl: z.string().nullable(),
  url: z.string().nullable(),
  lastAnnotatedAt: z.string(),
});

const app = new Hono().post(
  "",
  sessionValidator,
  zValidator("json", CreateBookModel),
  async (c) => {
    const bookData = c.req.valid("json");
    console.log({ bookData, user: c.var.user });

    const env = parseEnv(c);
    const client = createClient<Database>(
      env.SUPABASE_URL,
      env.SUPABASE_SERVICE_ROLE_KEY,
    );

    const service = new BooksService(client);

    const { book, bookUser } = await service.createBook(bookData, c.var.user);

    const { notionPageId } = await saveBook(c.var.user, {
      ...book,
      lastAnnotatedAt: bookUser.lastAnnotatedAt,
    });

    await client.from("Books_NotionUsers")
      .update({ notionPageId })
      .eq("userId", bookUser.userId)
      .eq("bookId", bookUser.bookId);

    return c.json(
      {
        message: "Book created",
        book: book,
      },
      201,
    );
  },
);

export { app as books };
