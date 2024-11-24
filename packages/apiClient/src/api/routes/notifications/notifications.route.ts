import { Hono } from "hono";
import { sessionValidator } from "../../middleware/session-validator.js";
import { parseEnv } from "../../../lib/parseEnv.js";
import { NotificationsService } from "./notifications.service.js";

const app = new Hono().get(
  "slack",
  sessionValidator,
  async (c) => {
    const channelId = c.req.query("channel_id");
    const channelName = c.req.query("channel_name");

    if (!channelId || !channelName) {
      return c.text("Channel ID and Name is required", 400);
    }

    const env = parseEnv(c);
    const service = new NotificationsService(env);

    await service.saveSettings(
      {
        platform: "slack",
        settings: {
          channelId,
          channelName,
        },
      },
      c.var.user,
    );

    return c.text(
      "Successfully registered slack notification settings, please close this page",
      200,
    );
  },
);

export { app as notifications };
