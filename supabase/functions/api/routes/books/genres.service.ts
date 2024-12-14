import { SupabaseClient } from "jsr:@supabase/supabase-js";
import { Database } from "../../../types/database.types.ts";

export class GenresService {
  constructor(private supabase: SupabaseClient<Database>) {}

  async findOrCreate(name: string) {
    const { data: genre, error } = await this.supabase
      .from("Genres")
      .upsert({
        name,
      })
      .select().single();

    if (error) {
      throw error;
    }

    return { genre };
  }
}
