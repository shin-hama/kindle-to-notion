import { AuthenticatedUser, HighlightModel } from "../../../types/index.js";
export type CreateHighlightDTO = HighlightModel;
export declare function saveHighlight(user: AuthenticatedUser, bookId: string, asin: string, highlight: CreateHighlightDTO): Promise<{
    id: string;
}>;
//# sourceMappingURL=highlights.notion.d.ts.map