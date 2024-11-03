import { SupabaseClient } from "../../deps/jsr.io/@supabase/supabase-js/2.45.4/src/index.js";
import { Database } from "../../types/database.types.js";
import { AuthenticatedUser } from "../../types/index.js";
export declare class UsersService {
    private supabase;
    private encryptionKey;
    constructor(url: string, key: string, encryptionKey: string);
    createSupabaseClient: (url: string, key: string) => SupabaseClient<Database, "public", {
        Tables: {
            Book: {
                Row: {
                    asin: string;
                    author: string;
                    created_at: string;
                    id: string;
                    imageUrl: string | null;
                    title: string;
                    url: string | null;
                };
                Insert: {
                    asin: string;
                    author: string;
                    created_at?: string;
                    id: string;
                    imageUrl?: string | null;
                    title: string;
                    url?: string | null;
                };
                Update: {
                    asin?: string;
                    author?: string;
                    created_at?: string;
                    id?: string;
                    imageUrl?: string | null;
                    title?: string;
                    url?: string | null;
                };
                Relationships: [];
            };
            Books_NotionUsers: {
                Row: {
                    bookId: string;
                    createdAt: string;
                    lastAnnotatedAt: string;
                    notionPageId: string | null;
                    userId: string;
                };
                Insert: {
                    bookId: string;
                    createdAt?: string;
                    lastAnnotatedAt: string;
                    notionPageId?: string | null;
                    userId: string;
                };
                Update: {
                    bookId?: string;
                    createdAt?: string;
                    lastAnnotatedAt?: string;
                    notionPageId?: string | null;
                    userId?: string;
                };
                Relationships: [{
                    foreignKeyName: "Books_NotionUsers_bookId_fkey";
                    columns: ["bookId"];
                    isOneToOne: false;
                    referencedRelation: "Book";
                    referencedColumns: ["id"];
                }, {
                    foreignKeyName: "Books_NotionUsers_userId_fkey";
                    columns: ["userId"];
                    isOneToOne: false;
                    referencedRelation: "NotionUser";
                    referencedColumns: ["id"];
                }];
            };
            Highlight: {
                Row: {
                    bookId: string;
                    color: Database["public"]["Enums"]["HighlightColor"];
                    created_at: string;
                    id: string;
                    location: number;
                    note: string | null;
                    page: number | null;
                    text: string;
                    userId: string;
                };
                Insert: {
                    bookId: string;
                    color: Database["public"]["Enums"]["HighlightColor"];
                    created_at?: string;
                    id: string;
                    location?: number;
                    note?: string | null;
                    page?: number | null;
                    text: string;
                    userId: string;
                };
                Update: {
                    bookId?: string;
                    color?: Database["public"]["Enums"]["HighlightColor"];
                    created_at?: string;
                    id?: string;
                    location?: number;
                    note?: string | null;
                    page?: number | null;
                    text?: string;
                    userId?: string;
                };
                Relationships: [{
                    foreignKeyName: "Highlight_bookId_fkey";
                    columns: ["bookId"];
                    isOneToOne: false;
                    referencedRelation: "Book";
                    referencedColumns: ["id"];
                }, {
                    foreignKeyName: "Highlight_userId_fkey";
                    columns: ["userId"];
                    isOneToOne: false;
                    referencedRelation: "NotionUser";
                    referencedColumns: ["id"];
                }];
            };
            Notifications: {
                Row: {
                    created_at: string;
                    id: string;
                    is_active: boolean;
                    settings: import("../../types/database.types.js").Json;
                    updated_at: string;
                    user_id: string;
                };
                Insert: {
                    created_at?: string;
                    id?: string;
                    is_active?: boolean;
                    settings: import("../../types/database.types.js").Json;
                    updated_at?: string;
                    user_id: string;
                };
                Update: {
                    created_at?: string;
                    id?: string;
                    is_active?: boolean;
                    settings?: import("../../types/database.types.js").Json;
                    updated_at?: string;
                    user_id?: string;
                };
                Relationships: [{
                    foreignKeyName: "Notifications_userId_fkey";
                    columns: ["user_id"];
                    isOneToOne: true;
                    referencedRelation: "NotionUser";
                    referencedColumns: ["id"];
                }];
            };
            NotionPage: {
                Row: {
                    books_db_id: string;
                    created_at: string;
                    highlights_db_id: string;
                    page_id: string;
                    user_id: string;
                };
                Insert: {
                    books_db_id: string;
                    created_at?: string;
                    highlights_db_id: string;
                    page_id: string;
                    user_id: string;
                };
                Update: {
                    books_db_id?: string;
                    created_at?: string;
                    highlights_db_id?: string;
                    page_id?: string;
                    user_id?: string;
                };
                Relationships: [{
                    foreignKeyName: "NotionPage_user_id_fkey";
                    columns: ["user_id"];
                    isOneToOne: true;
                    referencedRelation: "NotionUser";
                    referencedColumns: ["id"];
                }];
            };
            NotionSecret: {
                Row: {
                    access_token: string;
                    created_at: string;
                    user_id: string;
                };
                Insert: {
                    access_token: string;
                    created_at?: string;
                    user_id: string;
                };
                Update: {
                    access_token?: string;
                    created_at?: string;
                    user_id?: string;
                };
                Relationships: [{
                    foreignKeyName: "NotionSecret_user_id_fkey";
                    columns: ["user_id"];
                    isOneToOne: true;
                    referencedRelation: "NotionUser";
                    referencedColumns: ["id"];
                }];
            };
            NotionUser: {
                Row: {
                    avatar_url: string | null;
                    bot_id: string;
                    created_at: string;
                    id: string;
                    name: string | null;
                    notion_uid: string;
                    workspace_icon: string | null;
                    workspace_id: string;
                    workspace_name: string | null;
                };
                Insert: {
                    avatar_url?: string | null;
                    bot_id: string;
                    created_at?: string;
                    id?: string;
                    name?: string | null;
                    notion_uid: string;
                    workspace_icon?: string | null;
                    workspace_id: string;
                    workspace_name?: string | null;
                };
                Update: {
                    avatar_url?: string | null;
                    bot_id?: string;
                    created_at?: string;
                    id?: string;
                    name?: string | null;
                    notion_uid?: string;
                    workspace_icon?: string | null;
                    workspace_id?: string;
                    workspace_name?: string | null;
                };
                Relationships: [];
            };
        };
        Views: {
            random_highlights: {
                Row: {
                    note: string | null;
                    text: string | null;
                    title: string | null;
                    userId: string | null;
                };
                Relationships: [{
                    foreignKeyName: "Highlight_userId_fkey";
                    columns: ["userId"];
                    isOneToOne: false;
                    referencedRelation: "NotionUser";
                    referencedColumns: ["id"];
                }];
            };
        };
        Functions: { [_ in never]: never; };
        Enums: {
            HighlightColor: "blue" | "orange" | "pink" | "yellow";
        };
        CompositeTypes: { [_ in never]: never; };
    }>;
    verifyAdmin: (sessionToken: string) => Promise<AuthenticatedUser | null>;
}
//# sourceMappingURL=users.d.ts.map