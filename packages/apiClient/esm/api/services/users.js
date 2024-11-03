import { createClient } from "../../deps/jsr.io/@supabase/supabase-js/2.45.4/src/index.js";
import { decrypt } from "../libs/encrypt.js";
export class UsersService {
    constructor(url, key, encryptionKey) {
        Object.defineProperty(this, "supabase", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "encryptionKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "createSupabaseClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (url, key) => {
                return createClient(url, key);
            }
        });
        Object.defineProperty(this, "verifyAdmin", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (sessionToken) => {
                const { data, error } = await this.supabase
                    .from("NotionUser")
                    .select("*, NotionSecret(access_token), NotionPage(page_id, books_db_id, highlights_db_id)")
                    .eq("bot_id", sessionToken)
                    .single();
                if (error) {
                    throw error;
                }
                if (!data || !data.NotionSecret || !data.NotionPage) {
                    return null;
                }
                return {
                    ...data,
                    NotionPage: data.NotionPage,
                    NotionSecret: {
                        ...data.NotionSecret,
                        access_token: await decrypt(data.NotionSecret.access_token, this.encryptionKey),
                    },
                };
            }
        });
        this.supabase = this.createSupabaseClient(url, key);
        this.encryptionKey = encryptionKey;
    }
}
