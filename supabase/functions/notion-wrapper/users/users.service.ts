import { createClient, SupabaseClient } from "jsr:@supabase/supabase-js";
import { Database } from "../types/database.types.ts";
import { decrypt, encrypt } from "../libs/encrypt.ts";
import { AuthenticatedUser, Env } from "../types/index.ts";

export class UsersService {
  private supabase: SupabaseClient<Database>;
  private encryptionKey: string;

  constructor(env: Env) {
    this.supabase = this.createSupabaseClient(
      env.SUPABASE_URL,
      env.SUPABASE_SERVICE_ROLE_KEY,
    );
    this.encryptionKey = env.ENCRYPTION_KEY;
  }

  saveUser = async (
    data: Database["public"]["Tables"]["NotionUser"]["Insert"],
  ) => {
    const { data: user, error } = await this.supabase.from("NotionUser").upsert(
      [data],
    );
    if (error) {
      throw error;
    }
    return user;
  };

  savePage = async (
    data: Database["public"]["Tables"]["NotionPage"]["Insert"],
  ) => {
    const { data: page, error } = await this.supabase.from("NotionPage").upsert(
      [data],
    );
    if (error) {
      throw error;
    }

    return page;
  };

  saveSecret = async (data: { access_token: string; user_id: string }) => {
    const { data: secret, error } = await this.supabase
      .from("NotionSecret")
      .upsert([
        {
          access_token: await encrypt(data.access_token, this.encryptionKey),
          user_id: data.user_id,
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    return secret;
  };

  createSupabaseClient = (url: string, key: string) => {
    return createClient<Database>(url, key);
  };

  find = async (id: string): Promise<AuthenticatedUser | null> => {
    const { data, error } = await this.supabase
      .from("NotionUser")
      .select(
        "*, NotionSecret(access_token), NotionPage(page_id, books_db_id, highlights_db_id)",
      )
      .eq("id", id)
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
        access_token: await decrypt(
          data.NotionSecret.access_token,
          this.encryptionKey,
        ),
      },
    };
  };
}
