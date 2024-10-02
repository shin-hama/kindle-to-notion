import { Hono } from "jsr:@hono/hono";
import { env } from "jsr:@hono/hono/adapter";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { BooksNotionUsersModel, EnvSchema } from "../types/index.ts";
import { Database } from "../types/database.types.ts";
import { saveBook } from "./books.service.ts";
import { UsersService } from "../users/users.service.ts";

const app = new Hono();
app.post("/", async (c) => {
  const relation = await c.req.json() as BooksNotionUsersModel;
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
    return c.text("");
  }

  try {
    await saveBook(user, {
      ...book.data,
      lastAnnotatedAt: relation.lastAnnotatedAt,
    });
  } catch (e) {
    console.error(e);
  }

  return c.json({
    user: user,
    book: book.data,
  });
});

export { app as books };
