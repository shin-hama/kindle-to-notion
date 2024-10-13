// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import { Hono } from "npm:hono";
import { api } from "./app.ts";
import { cors } from "npm:hono/cors";

// change this to your function name
const functionName = "api";
const app = new Hono().basePath(`/${functionName}`);

app.use(
  cors({
    origin: [
      "chrome-extension://kdachoglhcpepdgcpgbjomogllpclfkf",
    ],
    allowMethods: ["POST", "GET", "OPTIONS"],
    maxAge: 600,
    credentials: true,
  }),
);
app.route("/", api);
app.get("/hello", (c) => c.text("Hello from hono-server!"));

Deno.serve(app.fetch);

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/test' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
