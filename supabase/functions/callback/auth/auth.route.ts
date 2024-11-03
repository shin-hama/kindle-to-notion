import { Hono } from "jsr:@hono/hono";
import { env } from "jsr:@hono/hono/adapter";
import { setCookie } from "jsr:@hono/hono/cookie";
import { EnvSchema } from "../../types/index.ts";
import { notionHandler } from "./handler.ts";

const app = new Hono();

app.get("/", async (c) => {
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

  setCookie(c, "session_token", result.data.session_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return c.redirect(result.data.redirect_url);
});

export { app as notionCallback };
