import { Hono } from "jsr:@hono/hono";
import { env } from "jsr:@hono/hono/adapter";
import { createClient } from "jsr:@supabase/supabase-js";
import {
  BooksNotionUsersModel,
  EnvSchema,
  SupabaseDBTriggerdEvent,
} from "../../types/index.ts";
import { Database } from "../../types/database.types.ts";
import { saveBook } from "./books.service.ts";
import { UsersService } from "../users/users.service.ts";

const app = new Hono();
app.post("/", async (c) => {
  const { record: relation } = await c.req.json() as SupabaseDBTriggerdEvent<
    BooksNotionUsersModel
  >;
  console.log(relation);
  const client = createClient<Database>(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );

  const envResult = EnvSchema.safeParse(env(c));
  if (!envResult.success) {
    c.status(500);
    return c.text("Environment variables are not set");
  }

  const user = await new UsersService(envResult.data).find(relation.userId);
  const book = await client.from("Book").select("*").eq("id", relation.bookId)
    .single();

  if (!user || book.error) {
    return c.text("User or book not found");
  }

  try {
    const { notionPageId } = await saveBook(user, {
      ...book.data,
      lastAnnotatedAt: relation.lastAnnotatedAt,
    });

    await client.from("Books_NotionUsers")
      .update({ notionPageId })
      .eq("userId", relation.userId)
      .eq("bookId", relation.bookId);
  } catch (e) {
    console.error(e);
  }

  return c.json({
    user: user,
    book: book.data,
  });
});

export { app as books };
