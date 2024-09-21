import { Request } from 'express';
import { Database } from './database.types';

export type CustomContext = {
  req: Request & { user: AuthenticatedUser };
};

export type AuthenticatedUser =
  Database['public']['Tables']['NotionUser']['Row'] & {
    NotionSecret: Pick<
      Database['public']['Tables']['NotionSecret']['Row'],
      'access_token' | 'iv'
    >;
    NotionPage: Pick<
      Database['public']['Tables']['NotionPage']['Row'],
      'books_db_id' | 'highlights_db_id'
    >;
  };
