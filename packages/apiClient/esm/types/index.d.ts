import { Database } from "./database.types.js";
import { z } from "zod";
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
export declare const EnvSchema: any;
export type Env = z.infer<typeof EnvSchema>;
export type HighlightModel = Database["public"]["Tables"]["Highlight"]["Row"];
export type SupabaseDBTriggerdEvent<T> = {
    type: "INSERT" | "UPDATE" | "DELETE";
    table: keyof Database["public"]["Tables"];
    record: T;
    schema: "public";
    old_record: T | null;
};
//# sourceMappingURL=index.d.ts.map