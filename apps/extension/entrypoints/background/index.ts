import { isSessionValid } from "@/utils/is-session-valid";
import {
  GetUserMessageResponse,
  ToBackendMessageSchema,
} from "../types/messaging";
import { me } from "./handler/me";
import { handler as createBookWithHighlights } from "./handler/createBookWithHighlights";

export default defineBackground(() => {
  browser.runtime.onMessage.addListener(
    async (message, sender, sendResponse) => {
      console.log(message);
      const parsedResult = ToBackendMessageSchema.safeParse(message);

      if (!parsedResult.success) {
        console.error("Invalid message", parsedResult.error);
        return;
      }

      const msg = parsedResult.data;
      if (msg.type === "CreateBookWithHighlights") {
        const result = await createBookWithHighlights(msg.data);
        if (result.error) {
          return { success: false, error: result.error };
        }
        return { success: true };
      } else if (msg.type === "GetUser") {
        const user = (await isSessionValid()) ? await me() : null;
        return { user } satisfies GetUserMessageResponse;
      } else {
        throw new Error(`Not implemented message type: ${msg}`);
      }
    },
  );
});
