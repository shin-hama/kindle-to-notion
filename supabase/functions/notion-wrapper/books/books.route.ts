import { Hono } from "npm:hono";
import { env } from "npm:hono/adapter";
import { createClient } from "jsr:@supabase/supabase-js";
import {
  BooksNotionUsersModel,
  EnvSchema,
  SupabaseDBTriggerdEvent,
} from "../../types/index.ts";
import { Database } from "../../types/database.types.ts";
import { saveBook } from "../../api/routes/books/books.notion.ts";
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
    console.error("Environment variables are not set");
    c.status(500);
    return c.text("Environment variables are not set");
  }

  const user = await new UsersService(envResult.data).find(relation.userId);
  const book = await client.from("Book").select("*").eq("id", relation.bookId)
    .single();

  if (!user || book.error) {
    console.warn({ message: "User or book not found", user, book });
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
    console.error({
      message: "Failed to save book to notion",
      error: e,
      input: { user, book: book.data },
    });
  }

  return c.json({
    user: user,
    book: book.data,
  });
});

export { app as books };
