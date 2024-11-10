import {
  createClient as createSupabaseClient,
  SupabaseClient,
} from "jsr:@supabase/supabase-js";
import { Database } from "../../types/database.types.ts";

export const createClient = (): SupabaseClient<Database> => {
  const client = createSupabaseClient<Database>(
    Deno.env.get("SUPABASE_URL") ?? (() => {
      throw new Error("SUPABASE_URL is required");
    })(),
    Deno.env.get("SUPABASE_KEY") ?? (() => {
      throw new Error("SUPABASE_KEY is required");
    })(),
  );

  return client;
};
