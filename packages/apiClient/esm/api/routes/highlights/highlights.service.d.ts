import { SupabaseClient } from "../../../deps/jsr.io/@supabase/supabase-js/2.45.4/src/index.js";
import { AuthenticatedUser } from "../../../types/index.js";
import { CreateHighlightModel } from "./highlights.model.js";
import { Database } from "../../../types/database.types.js";
export declare class HighlightsService {
    private supabase;
    constructor(supabase: SupabaseClient<Database>);
    getHighlights(): Promise<void>;
    createHighlights(newHighlights: Array<CreateHighlightModel>, user: AuthenticatedUser): Promise<{
        bookId: string;
        color: Database["public"]["Enums"]["HighlightColor"];
        created_at: string;
        id: string;
        location: number;
        note: string | null;
        notionPageId: string | null;
        page: number | null;
        text: string;
        userId: string;
        Book: {
            asin: string;
            author: string;
            created_at: string;
            id: string;
            imageUrl: string | null;
            title: string;
            url: string | null;
        } | null;
    }[]>;
}
//# sourceMappingURL=highlights.service.d.ts.map