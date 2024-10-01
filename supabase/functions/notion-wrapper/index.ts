// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import { Hono } from "jsr:@hono/hono";
import { env } from "jsr:@hono/hono/adapter";
import { setCookie } from "jsr:@hono/hono/cookie";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { BooksNotionUsersModel, EnvSchema } from "./types/index.ts";
import { Database } from "./types/database.types.ts";
import { saveBook } from "./notion/books.ts";
import { notionHandler } from "./notion/auth.ts";

// change this to your function name
const app = new Hono().basePath("notion-wrapper");

app.get("/", (c) => {
  return c.text("Hello from hono-server!");
});

app.post("/", async (c) => {
  const test = await c.req.json();
  console.log(test);
  createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );
  return c.text("Hello from hono-server!");
});

app.post("/books", async (c) => {
  const relation = await c.req.json() as BooksNotionUsersModel;
  console.log(new Date().toISOString());
  console.log(relation);
  console.log(env(c));
  const client = createClient<Database>(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );

  const user = await client.from("NotionUser").select(
    "*, NotionSecret(access_token, iv), NotionPage(page_id, books_db_id, highlights_db_id)",
  ).eq(
    "id",
    relation.userId,
  ).single();
  const book = await client.from("Book").select("*").eq("id", relation.bookId)
    .single();

  if (user.error || book.error) {
    return c.text("");
  }

  if (user.data.NotionPage !== null && user.data.NotionSecret !== null) {
    try {
      await saveBook({
        ...user.data,
        NotionPage: user.data.NotionPage,
        NotionSecret: user.data.NotionSecret,
      }, {
        ...book.data,
        lastAnnotatedAt: relation.lastAnnotatedAt,
      });
    } catch (e) {
      console.error(e);
    }
  }

  return c.json({
    user: user.data,
    book: book.data,
  });
});

app.get("/callback/notion", async (c) => {
  const code = c.req.query("code");

  if (!code) {
    c.status(400);
    return c.text("Missing code ");
  }

  const envResult = EnvSchema.safeParse(env(c));
  if (!envResult.success) {
    c.status(500);
    return c.text("Environment variables are not set");
  }

  const result = await notionHandler(code, envResult.data);
  if (result.error || !result.data) {
    c.status(500);
    return c.text(`${result.error}, please try again`);
  }

  setCookie(c, "SESSION_TOKEN_KEY", result.data.session_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return c.redirect(result.data.redirect_url);
});

Deno.serve(app.fetch);

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/notion-wrapper' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
