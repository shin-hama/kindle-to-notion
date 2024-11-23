import { SupabaseClient } from "jsr:@supabase/supabase-js";
import { AuthenticatedUser } from "../../../types/index.ts";
import { CreateHighlightModel } from "./highlights.model.ts";
import { Database } from "../../../types/database.types.ts";

export class HighlightsService {
  constructor(private supabase: SupabaseClient<Database>) {}

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
