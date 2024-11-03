import { createClient, SupabaseClient } from "../../../deps/jsr.io/@supabase/supabase-js/2.45.4/src/index.js";
import { AuthenticatedUser, Env } from "../../../types/index.js";
import { CreateHighlightModel } from "./highlights.model.js";
import { Database } from "../../../types/database.types.js";

export class HighlightsService {
  private supabase: SupabaseClient<Database>;
  constructor(env: Env) {
    this.supabase = createClient<Database>(
      env.SUPABASE_URL,
      env.SUPABASE_SERVICE_ROLE_KEY,
    );
  }

  async getHighlights() {}

  async createHighlights(
    newHighlights: Array<CreateHighlightModel>,
    user: AuthenticatedUser,
  ) {
    const { data, error } = await this.supabase
      .from("Highlight")
      .upsert(newHighlights.map((h) => ({ ...h, userId: user.id })))
      .select();

    if (error) {
      throw new Error("Error creating highlight");
    }

    return data;
  }
}
