import { Hono } from "jsr:@hono/hono";

const app = new Hono();

app.post("/notify", async (c) => {
  const { channel_id } = await c.req.parseBody();
  console.log(channel_id);

  return c.text(
    `Access here to register: https:localhost:54321/functions/v1/api/notification/slack?channel_id=${channel_id}`,
  );
});
