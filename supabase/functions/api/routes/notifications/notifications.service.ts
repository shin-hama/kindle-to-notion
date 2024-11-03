import { createClient, SupabaseClient } from "jsr:@supabase/supabase-js";
import { AuthenticatedUser, Env } from "../../../types/index.ts";
import { Database } from "../../../types/database.types.ts";
import { NotificationSettings } from "./notifications.model.ts";

export class NotificationsService {
  private supabase: SupabaseClient<Database>;
  constructor(env: Env) {
    this.supabase = createClient<Database>(
      env.SUPABASE_URL,
      env.SUPABASE_SERVICE_ROLE_KEY,
    );
  }

  async saveSettings(
    settings: NotificationSettings,
    user: AuthenticatedUser,
  ) {
    const { data, error } = await this.supabase
      .from("Notifications")
      .upsert({
        user_id: user.id,
        is_active: true,
        settings: settings,
      })
      .select();

    if (error) {
      throw new Error("Error creating highlight");
    }

    return data;
  }
}
