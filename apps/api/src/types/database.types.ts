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
      NotionPage: {
        Row: {
          books_db_id: string;
          created_at: string;
          highlights_db_id: string;
          page_id: string;
          user_id: string;
        };
        Insert: {
          books_db_id?: string;
          created_at?: string;
          highlights_db_id?: string;
          page_id?: string;
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
            foreignKeyName: 'NotionPage_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'NotionUser';
            referencedColumns: ['id'];
          },
        ];
      };
      NotionSecret: {
        Row: {
          access_token: string;
          created_at: string;
          iv: string;
          user_id: string;
        };
        Insert: {
          access_token?: string;
          created_at?: string;
          iv?: string;
          user_id: string;
        };
        Update: {
          access_token?: string;
          created_at?: string;
          iv?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'NotionSecret_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'NotionUser';
            referencedColumns: ['id'];
          },
        ];
      };
      NotionUser: {
        Row: {
          avatar_url: string;
          bot_id: string;
          created_at: string;
          id: string;
          name: string;
          notion_uid: string;
          workspace_icon: string;
          workspace_id: string;
          workspace_name: string;
        };
        Insert: {
          avatar_url?: string;
          bot_id?: string;
          created_at?: string;
          id?: string;
          name?: string;
          notion_uid?: string;
          workspace_icon?: string;
          workspace_id?: string;
          workspace_name?: string;
        };
        Update: {
          avatar_url?: string;
          bot_id?: string;
          created_at?: string;
          id?: string;
          name?: string;
          notion_uid?: string;
          workspace_icon?: string;
          workspace_id?: string;
          workspace_name?: string;
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
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
