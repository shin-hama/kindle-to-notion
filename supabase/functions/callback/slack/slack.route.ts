import { env } from "npm:hono/adapter";
import { Hono } from "npm:hono";
import { EnvSchema } from "../../types/index.ts";
import { OAuthV2Response } from "npm:@slack/oauth";
import { UsersService } from "../users/users.service.ts";
import { SlackRepository } from "./slack.repository.ts";

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
    `Access here to register channel: ${envResult.data.API_URL}/notifications/slack?channel_id=${channel_id}&channel_name=${channel_name}`,
  );
});

app.get("/auth", async (c) => {
  const code = c.req.query("code");
  if (!code) {
    c.status(400);
    return c.text("Code is required");
  }

  const state = c.req.query("state"); // user_id を state に入れている
  if (!state) {
    c.status(400);
    return c.text("State is required");
  }

  const envResult = EnvSchema.safeParse(env(c));
  if (!envResult.success) {
    console.error(envResult.error);
    c.status(500);
    return c.text("Environment variables are not set");
  }

  const usersService = new UsersService(envResult.data);
  const user = await usersService.find(state);

  if (!user) {
    c.status(404);
    return c.text("Invalid state");
  }

  const { SLACK_CLIENT_ID, SLACK_CLIENT_SECRET } = envResult.data;

  const response = await fetch(
    `https://slack.com/api/oauth.v2.access?client_id=${SLACK_CLIENT_ID}&client_secret=${SLACK_CLIENT_SECRET}&code=${code}`,
    {
      method: "POST",
    },
  );

  const body = await response.json() as OAuthV2Response;
  if (!body.ok) {
    c.status(400);
    return c.text("Failed to authenticate");
  }

  const slackRepository = new SlackRepository(envResult.data);
  const result = await slackRepository.saveSlackSecret(user.id, body);

  if (result.error) {
    c.status(500);
    return c.text(result.error);
  }

  return c.text("Success");
});

export { app as slackCallback };
