import { Database } from "./database.types.ts";
import { z } from "npm:zod";

export type Result<T> = {
  data?: T | null;
  error?: string | null;
};

export type AuthenticatedUser =
  & Database["public"]["Tables"]["NotionUser"]["Row"]
  & {
    NotionSecret: Pick<
      Database["public"]["Tables"]["NotionSecret"]["Row"],
      "access_token"
    >;
    NotionPage: Pick<
      Database["public"]["Tables"]["NotionPage"]["Row"],
      "books_db_id" | "highlights_db_id" | "page_id"
    >;
  };

export type BooksNotionUsersModel =
  Database["public"]["Tables"]["Books_NotionUsers"]["Row"];
export type CreateBookDTO = Database["public"]["Tables"]["Book"]["Insert"] & {
  lastAnnotatedAt: string;
};

export const EnvSchema = z.object({
  ENCRYPTION_KEY: z.string(),
  SUPABASE_URL: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
  NOTION_REDIRECT_URL: z.string(),
  NOTION_CLIENT_ID: z.string(),
  NOTION_CLIENT_SECRET: z.string(),
  API_URL: z.string(),
});
export type Env = z.infer<typeof EnvSchema>;

export type HighlightModel = Database["public"]["Tables"]["Highlight"]["Row"];

export type SupabaseDBTriggerdEvent<T> = {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: keyof Database["public"]["Tables"];
  record: T;
  schema: "public";
  old_record: T | null;
};
