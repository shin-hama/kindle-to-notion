import { getRandomeNote } from "./db/get-random.ts";
import { getAllUsers } from "./db/get-users.ts";
import { getPageUrl } from "./notion/get-page.ts";
import { NotificationService } from "./services/notify.ts";

const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");

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

async function sendDailyNotification() {
  const notificationService = new NotificationService(SENDGRID_API_KEY ?? "");

  const users = await getAllUsers();
  console.log(users);

  if (!users) {
    console.log("No users found in the database");
    return;
  }

  await Promise.all(users.map(async (user) => {
    try {
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

      if (
        !randomNote || !randomNote.title || !randomNote.text || !randomNote.note
      ) {
        console.log("No notes found in the database");
        return;
      }
      const body = buildBody(
        randomNote.title,
        randomNote.text,
        randomNote.note,
        pageUrl,
      );
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  }));
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
// Deno Schedulerを使って毎朝9時に実行
if (import.meta.main) {
  sendDailyNotification();
  // const NINE_AM = "0 9 * * *"; // 毎朝9時

  // Deno.cron("Daily Note Notification", NINE_AM, () => {
  //   sendDailyNotification();
  // });
}
