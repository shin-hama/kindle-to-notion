import { Hono } from "hono";
import { sessionValidator } from "../../middleware/session-validator.js";
import { BooksService } from "./books.service.js";
import { parseEnv } from "../../../lib/parseEnv.js";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { saveBook } from "./books.notion.js";
import { createClient } from "../../../deps/jsr.io/@supabase/supabase-js/2.45.4/src/index.js";
const CreateBookModel = z.object({
    asin: z.string(),
    author: z.string(),
    title: z.string(),
    imageUrl: z.string().nullable(),
    url: z.string().nullable(),
    lastAnnotatedAt: z.string(),
});
const app = new Hono().post("", sessionValidator, zValidator("json", CreateBookModel), async (c) => {
    const bookData = c.req.valid("json");
    console.log({ bookData, user: c.var.user });
    try {
        const env = parseEnv(c);
        const client = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
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
        return c.json({
            message: "Book created",
            book: book,
        }, 201);
    }
    catch (error) {
        console.error(error);
        return c.json({ message: "Error creating book" }, 500);
    }
});
export { app as books };
