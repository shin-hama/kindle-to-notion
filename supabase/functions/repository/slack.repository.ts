import { createClient, SupabaseClient } from "jsr:@supabase/supabase-js@2";
import { Database } from "../types/database.types.ts";
import { Env } from "../types/index.ts";
import { OAuthV2Response } from "npm:@slack/oauth";
import { decrypt, encrypt } from "../lib/encrypt.ts";

export class SlackRepository {
  private client: SupabaseClient<Database>;
  private encriptionKey: string;

  constructor(e: Env) {
    this.client = createClient<Database>(
      e.SUPABASE_URL,
      e.SUPABASE_SERVICE_ROLE_KEY,
    );

    this.encriptionKey = e.ENCRYPTION_KEY;
  }

  async saveSlackSecret(userId: string, token: OAuthV2Response) {
    const { access_token, ...rest } = token;
    const { data, error } = await this.client
      .from("SlackSecret")
      .upsert({
        userId,
        accessToken: await encrypt(access_token ?? "", this.encriptionKey),
        bodId: rest.bot_user_id ?? "",
        scope: rest.scope ?? "",
        others: rest,
      });

    if (error) {
      console.error(error);
      return { error: `Error saving slack token` };
    }

    return { data: data };
  }

  async getSlackSecret(userId: string) {
    const { data, error } = await this.client
      .from("SlackSecret")
      .select("*")
      .eq("userId", userId)
      .single();

    if (error) {
      return { error: "Error getting slack token" };
    }

    return {
      data: {
        ...data,
        accessToken: await decrypt(data.accessToken, this.encriptionKey),
      },
    };
  }
}
