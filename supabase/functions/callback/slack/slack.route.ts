import { env } from "npm:hono/adapter";
import { Hono } from "npm:hono";
import { EnvSchema } from "../../types/index.ts";

const app = new Hono();

app.post("/notify", async (c) => {
  const envResult = EnvSchema.safeParse(env(c));
  if (!envResult.success) {
    c.status(500);
    return c.text("Environment variables are not set");
  }

  const { channel_id, channel_name } = await c.req.parseBody();
  if (typeof channel_id !== "string" || typeof channel_name !== "string") {
    c.status(400);
    return c.text("Channel ID and Name is required");
  }

  return c.text(
    `Access here to register: ${envResult.data.API_URL}/notifications/slack?channel_id=${channel_id}&channel_name=${channel_name}`,
  );
});

export { app as slackCallback };
