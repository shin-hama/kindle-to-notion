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
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? (() => {
      throw new Error("SUPABASE_SERVICE_ROLE_KEY is required");
    })(),
  );

  return client;
};
