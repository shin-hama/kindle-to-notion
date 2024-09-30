import { Database } from "./database.types.ts";

export type AuthenticatedUser =
  & Database["public"]["Tables"]["NotionUser"]["Row"]
  & {
    NotionSecret: Pick<
      Database["public"]["Tables"]["NotionSecret"]["Row"],
      "access_token" | "iv"
    >;
    NotionPage: Pick<
      Database["public"]["Tables"]["NotionPage"]["Row"],
      "books_db_id" | "highlights_db_id" | "page_id"
    >;
  };

export type CreateBookDTO = Database["public"]["Tables"]["Book"]["Insert"];
