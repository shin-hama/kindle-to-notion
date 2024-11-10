import { Hono } from "npm:hono";
import { sessionValidator } from "../../middleware/session-validator.ts";
import { BooksService } from "./books.service.ts";
import { parseEnv } from "../../../lib/parseEnv.ts";
import { zValidator } from "npm:@hono/zod-validator";
import { z } from "npm:zod";

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

    const service = new BooksService(parseEnv(c));

    const book = await service.createBook(bookData, c.var.user);

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
