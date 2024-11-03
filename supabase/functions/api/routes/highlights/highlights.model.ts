import { Database } from "../../../types/database.types.ts";

export type CreateHighlightModel = Omit<
  Database["public"]["Tables"]["Highlight"]["Insert"],
  "userId"
>;
