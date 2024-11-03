import { Database } from "../../../../../packages/shared/mod.ts";

export type CreateHighlightModel = Omit<
  Database["public"]["Tables"]["Highlight"]["Insert"],
  "userId"
>;
