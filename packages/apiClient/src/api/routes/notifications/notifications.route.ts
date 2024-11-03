import { Hono } from "hono";
import { sessionValidator } from "../../middleware/session-validator.js";
import { parseEnv } from "../../libs/parseEnv.js";
import { NotificationsService } from "./notifications.service.js";

const app = new Hono().get(
  "slack",
  sessionValidator,
  async (c) => {
    const channelId = c.req.param("channel_id");
    const channelName = c.req.param("channel_name");

    if (!channelId || !channelName) {
      return c.text("Channel ID and Name is required", 400);
    }

    const service = new NotificationsService(parseEnv(c));

    await service.saveSettings(
      {
        platform: "slack",
        settings: {
          channelId: channelId,
          channelName: channelName,
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
