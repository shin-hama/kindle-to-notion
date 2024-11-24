import { AuthenticatedUser, CreateBookDTO } from "../../../types/index.js";
export declare const saveBook: (user: AuthenticatedUser, book: CreateBookDTO) => Promise<{
    notionPageId: string;
}>;
//# sourceMappingURL=books.notion.d.ts.map