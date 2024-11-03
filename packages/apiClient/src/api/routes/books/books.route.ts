import { Hono } from "hono";
import { sessionValidator } from "../../middleware/session-validator.js";
import { BooksService } from "./books.service.js";
import { parseEnv } from "../../libs/parseEnv.js";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

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
