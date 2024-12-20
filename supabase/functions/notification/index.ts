import { NotificationSettingsSchema } from "../api/routes/notifications/notifications.model.ts";
import { parseEnv } from "../lib/parseEnv.ts";
import { SlackRepository } from "../repository/slack.repository.ts";
import { getRandomeNote } from "./db/get-random.ts";
import { getAllUsers } from "./db/get-users.ts";
import { getNotificationSettings } from "./db/notifications.ts";
import { getPageUrl } from "./notion/get-page.ts";
import { NotificationService } from "./services/notify.ts";

const buildBody = (
  bookTitle: string,
  highlight: string,
  note: string,
  pageUrl: string,
) => {
  return `
📚 今日の一冊

${bookTitle}

💭 印象的な一節:

${highlight}

🤔 あなたの考察:

${note}

📖 Kino を使ってあなたの読書記録を振り返りましょう

${pageUrl}
          `.trim();
};

import { Hono } from "npm:hono";

// change this to your function name
const app = new Hono().basePath("notification");

app.get("/health", (c) => {
  return c.json({ message: "Hello, Callback!" });
});

app.post("", async (c) => {
  const e = parseEnv(c);

  const users = await getAllUsers(e);

  if (!users) {
    console.log("No users found in the database");
    return c.text("No users found in the database");
  }

  await Promise.all(users.map(async (user) => {
    try {
      console.log(user);
      if (!user.NotionSecret || !user.NotionPage) {
        console.log("No Notion secret or page found for user");
        return;
      }

      const pageUrl = await getPageUrl(
        user.NotionSecret.access_token,
        user.NotionPage.page_id,
      );

      if (!pageUrl) {
        console.log("No page URL found for user");
        return;
      }

      const randomNote = await getRandomeNote(user.id);

      if (!randomNote) {
        console.log("No notes found in the database");
        return;
      }
      const body = buildBody(
        randomNote.title ?? "",
        randomNote.text ?? "",
        randomNote.note ?? "",
        pageUrl,
      );

      const notification = await getNotificationSettings(user.id);
      const settings = NotificationSettingsSchema.safeParse(
        notification?.settings,
      );
      if (!settings.success) {
        console.log("No notification settings found for user");
        return;
      }

      const slackSecret = await new SlackRepository(e).getSlackSecret(user.id);
      if (!slackSecret.data) {
        console.log("No slack secret found for user", slackSecret.error);
        return;
      }

      const notificationService = new NotificationService(
        slackSecret.data.accessToken,
      );
      await notificationService.send(body, settings.data);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  }));

  return c.text("All notifications sent successfully");
});

Deno.serve(app.fetch);
