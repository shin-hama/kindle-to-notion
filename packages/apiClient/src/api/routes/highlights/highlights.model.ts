import { Database } from "../../../types/database.types.js";

export type CreateHighlightModel = Omit<
  Database["public"]["Tables"]["Highlight"]["Insert"],
  "userId"
>;