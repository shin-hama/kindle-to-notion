import { getRandomeNote } from "./db/get-random.ts";
import { getAllUsers } from "./db/get-users.ts";
import { NotificationService } from "./services/notify.ts";

const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");

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
      const randomNote = await getRandomeNote(user.id);

      if (!randomNote) {
        console.log("No notes found in the database");
        return;
      }

      //       const emailContent = `
      // 今日のハイライト

      // 書籍：${randomNote.book_title}
      // メモ：${randomNote.content}
      //     `.trim();

      //       await notificationService.sendEmail(
      //         randomNote.email,
      //         "今日の読書ハイライト",
      //         emailContent,
      //       );

      //       console.log(`Notification sent to ${randomNote.email}`);
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
