export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
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
        Relationships: [
          {
            foreignKeyName: "Books_NotionUsers_bookId_fkey";
            columns: ["bookId"];
            isOneToOne: false;
            referencedRelation: "Book";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Books_NotionUsers_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "NotionUser";
            referencedColumns: ["id"];
          },
        ];
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
        Relationships: [
          {
            foreignKeyName: "Highlight_bookId_fkey";
            columns: ["bookId"];
            isOneToOne: false;
            referencedRelation: "Book";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Highlight_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "NotionUser";
            referencedColumns: ["id"];
          },
        ];
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
        Relationships: [
          {
            foreignKeyName: "NotionPage_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "NotionUser";
            referencedColumns: ["id"];
          },
        ];
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
        Relationships: [
          {
            foreignKeyName: "NotionSecret_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "NotionUser";
            referencedColumns: ["id"];
          },
        ];
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
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      HighlightColor: "blue" | "orange" | "pink" | "yellow";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (
      & Database[PublicTableNameOrOptions["schema"]]["Tables"]
      & Database[PublicTableNameOrOptions["schema"]]["Views"]
    )
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database } ? (
    & Database[PublicTableNameOrOptions["schema"]]["Tables"]
    & Database[PublicTableNameOrOptions["schema"]]["Views"]
  )[TableName] extends {
    Row: infer R;
  } ? R
  : never
  : PublicTableNameOrOptions extends keyof (
    & PublicSchema["Tables"]
    & PublicSchema["Views"]
  ) ? (
      & PublicSchema["Tables"]
      & PublicSchema["Views"]
    )[PublicTableNameOrOptions] extends {
      Row: infer R;
    } ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I;
  } ? I
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    } ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U;
  } ? U
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    } ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
