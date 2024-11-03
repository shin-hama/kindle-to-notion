import { createClient, SupabaseClient } from "jsr:@supabase/supabase-js";
import { Database } from "../../../../packages/shared/mod.ts";
import { decrypt } from "../libs/encrypt.ts";
import { AuthenticatedUser } from "../types/index.ts";

export class UsersService {
  private supabase: SupabaseClient<Database>;
  private encryptionKey: string;

  constructor(url: string, key: string, encryptionKey: string) {
    this.supabase = this.createSupabaseClient(url, key);
    this.encryptionKey = encryptionKey;
  }

  createSupabaseClient = (url: string, key: string) => {
    return createClient<Database>(url, key);
  };

  verifyAdmin = async (
    sessionToken: string,
  ): Promise<AuthenticatedUser | null> => {
    const { data, error } = await this.supabase
      .from("NotionUser")
      .select(
        "*, NotionSecret(access_token), NotionPage(page_id, books_db_id, highlights_db_id)",
      )
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
        access_token: await decrypt(
          data.NotionSecret.access_token,
          this.encryptionKey,
        ),
      },
    };
  };
}
