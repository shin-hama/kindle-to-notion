import { WebClient } from "npm:@slack/web-api";
import { Env } from "../../types/index.ts";
import {
  NotificationSettings,
  SlackSettings,
} from "../../api/routes/notifications/notifications.model.ts";

export class NotificationService {
  private client: WebClient;

  constructor(e: Env) {
    this.client = new WebClient(e.SLACK_BOT_TOKEN);
  }

  async send(message: string, settings: NotificationSettings) {
    if (settings.platform === "slack") {
      await this.sendToSlack(
        message,
        settings.settings,
      );
    }
  }

  async sendToSlack(message: string, settings: SlackSettings) {
    const result = await this.client.chat.postMessage({
      channel: settings.channelId,
      text: message,
    });

    console.log(result);
  }
}
