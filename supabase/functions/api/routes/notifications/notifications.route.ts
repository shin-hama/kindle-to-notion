import { Hono } from "npm:hono";
import { sessionValidator } from "../../middleware/session-validator.ts";
import { parseEnv } from "../../libs/parseEnv.ts";
import { NotificationsService } from "./notifications.service.ts";
import { TokenService } from "../../../lib/token.ts";
import { NotificationTokenPayload } from "./notifications.model.ts";

const app = new Hono().get(
  "slack",
  async (c) => {
    const channelId = c.req.query("channel_id");
    const channelName = c.req.query("channel_name");

    if (!channelId || !channelName) {
      return c.text("Channel ID and Name is required", 400);
    }

    const env = parseEnv(c);
    const tokenService = await TokenService.create<NotificationTokenPayload>(
      env.TOKEN_SECRET,
    );
    const token = await tokenService.generateToken({
      platform: "slack",
      settings: {
        channelId,
        channelName,
      },
    }, 5);

    return c.redirect(`${env.API_URL}/notifications/handler?token=${token}`);
  },
).get("handler", sessionValidator, async (c) => {
  const token = c.req.query("token");

  if (!token) {
    return c.text("token is required", 400);
  }
  const env = parseEnv(c);
  const service = new NotificationsService(env);

  const tokenService = await TokenService.create<NotificationTokenPayload>(
    env.TOKEN_SECRET,
  );
  const { isValid, payload, error } = await tokenService.verifyAndDecodeToken(
    token,
  );

  if (!isValid || !payload) {
    return c.text(`Invalid token: ${error}`, 400);
  }

  await service.saveSettings(
    payload,
    c.var.user,
  );

  return c.text(
    "Successfully registered slack notification settings, please close this page",
    200,
  );
});

export { app as notifications };
