import { Database } from "./database.types.js";
import { z } from "zod";
import type { Payload } from "../deps/deno.land/x/djwt@v3.0.2/mod.js";
export type Result<T> = {
    data?: T | null;
    error?: string | null;
};
export type AuthenticatedUser = Database["public"]["Tables"]["NotionUser"]["Row"] & {
    NotionSecret: Pick<Database["public"]["Tables"]["NotionSecret"]["Row"], "access_token">;
    NotionPage: Pick<Database["public"]["Tables"]["NotionPage"]["Row"], "books_db_id" | "highlights_db_id" | "page_id">;
};
export type BooksNotionUsersModel = Database["public"]["Tables"]["Books_NotionUsers"]["Row"];
export type CreateBookDTO = Database["public"]["Tables"]["Book"]["Insert"] & {
    lastAnnotatedAt: string;
};
export declare const EnvSchema: z.ZodObject<{
    ENCRYPTION_KEY: z.ZodString;
    SUPABASE_URL: z.ZodString;
    SUPABASE_SERVICE_ROLE_KEY: z.ZodString;
    NOTION_REDIRECT_URL: z.ZodString;
    NOTION_CLIENT_ID: z.ZodString;
    NOTION_CLIENT_SECRET: z.ZodString;
    API_URL: z.ZodString;
    SLACK_BOT_TOKEN: z.ZodString;
    TOKEN_SECRET: z.ZodString;
}, "strip", z.ZodTypeAny, {
    ENCRYPTION_KEY: string;
    SUPABASE_URL: string;
    SUPABASE_SERVICE_ROLE_KEY: string;
    NOTION_REDIRECT_URL: string;
    NOTION_CLIENT_ID: string;
    NOTION_CLIENT_SECRET: string;
    API_URL: string;
    SLACK_BOT_TOKEN: string;
    TOKEN_SECRET: string;
}, {
    ENCRYPTION_KEY: string;
    SUPABASE_URL: string;
    SUPABASE_SERVICE_ROLE_KEY: string;
    NOTION_REDIRECT_URL: string;
    NOTION_CLIENT_ID: string;
    NOTION_CLIENT_SECRET: string;
    API_URL: string;
    SLACK_BOT_TOKEN: string;
    TOKEN_SECRET: string;
}>;
export type Env = z.infer<typeof EnvSchema>;
export type HighlightModel = Database["public"]["Tables"]["Highlight"]["Row"];
export type SupabaseDBTriggerdEvent<T> = {
    type: "INSERT" | "UPDATE" | "DELETE";
    table: keyof Database["public"]["Tables"];
    record: T;
    schema: "public";
    old_record: T | null;
};
export interface BaseTokenPayload extends Payload {
    exp?: number;
}
//# sourceMappingURL=index.d.ts.map