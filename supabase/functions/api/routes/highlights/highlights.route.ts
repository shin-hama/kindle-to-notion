import { Hono } from "npm:hono";
import { sessionValidator } from "../../middleware/session-validator.ts";
import { parseEnv } from "../../libs/parseEnv.ts";
import { HighlightsService } from "./highlights.service.ts";
import { zValidator } from "npm:@hono/zod-validator";
import { z } from "npm:zod";

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
    const { bookId, highlights } = c.req.valid("json");
    console.log({ bookId, highlights, user: c.var.user });
    const service = new HighlightsService(parseEnv(c));

    const highlight = await service.createHighlights(
      highlights.map((h) => ({
        ...h,
        bookId,
      })),
      c.var.user,
    );

    return c.json(
      {
        message: "highlight created",
        highlight: highlight,
      },
      201,
    );
  },
);

export { app as highlights };
