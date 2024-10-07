import { isSessionValid } from "@/utils/is-session-valid";
import {
  GetUserMessageResponse,
  ToBackendMessageSchema,
} from "../types/messaging";
import { me } from "./me";
import { createClient } from "./client";

export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });

  browser.runtime.onMessage.addListener(
    async (message, sender, sendResponse) => {
      try {
        console.log(message);
        const msg = ToBackendMessageSchema.parse(message);
        if (msg.type === "CreateBookWithHighlights") {
          try {
            const client = createClient();

            const result = await client.books.$post({
              json: msg.data.book,
            });

            if (result.status !== 201) {
              console.error("Failed to create book", result);
              return { error: "failed to create book" };
            }
            const { book } = await result.json();

            console.log("Book is created, " + msg.data.book.title);

            await client.highlights.$post({
              json: {
                bookId: book.id,
                asin: book.asin,
                highlights: msg.data.highlights,
              },
            });

            console.log(
              "Highlights are created: " + msg.data.highlights.length,
            );
            sendResponse();
            return { success: true };
          } catch (e) {
            console.error("Failed to create book and highlights", e);
            return { error: "failed to create schema" };
          }
        } else if (msg.type === "GetUser") {
          const user = (await isSessionValid()) ? await me() : null;
          return { user } satisfies GetUserMessageResponse;
        } else {
          throw new Error(`Not implemented message type: ${msg}`);
        }
      } catch (e) {
        console.error("Invalid message", e);
        return;
      }
    },
  );
});
