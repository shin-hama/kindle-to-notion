import { WebClient } from "npm:@slack/web-api";
import {
  NotificationSettings,
  SlackSettings,
} from "../../api/routes/notifications/notifications.model.ts";

export class NotificationService {
  private client: WebClient;

  constructor(token: string) {
    this.client = new WebClient(token);
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
