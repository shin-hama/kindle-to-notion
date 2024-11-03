import { createClient, SupabaseClient } from "../../../deps/jsr.io/@supabase/supabase-js/2.45.4/src/index.js";
import { AuthenticatedUser, Env } from "../../../types/index.js";
import { Database } from "../../../types/database.types.js";
import { NotificationSettings } from "./notifications.model.js";

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
