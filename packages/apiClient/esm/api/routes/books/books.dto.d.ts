import { Database } from "../../../types/database.types.js";
export type CreateBookModel = Omit<Database["public"]["Tables"]["Book"]["Insert"], "id"> & {
    lastAnnotatedAt: Database["public"]["Tables"]["Books_NotionUsers"]["Insert"]["lastAnnotatedAt"];
};
//# sourceMappingURL=books.dto.d.ts.map