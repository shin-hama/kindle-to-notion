import { SupabaseClient } from "../../../deps/jsr.io/@supabase/supabase-js/2.45.4/src/index.js";
import { Database } from "../../../types/database.types.js";
import { AuthenticatedUser } from "../../../types/index.js";
import { CreateBookModel } from "./books.dto.js";
export declare class BooksService {
    private supabase;
    constructor(supabase: SupabaseClient<Database>);
    createBook(newBook: CreateBookModel, user: AuthenticatedUser): Promise<{
        book: {
            asin: string;
            author: string;
            created_at: string;
            id: string;
            imageUrl: string | null;
            title: string;
            url: string | null;
        };
        bookUser: {
            bookId: string;
            createdAt: string;
            lastAnnotatedAt: string;
            notionPageId: string | null;
            userId: string;
        };
    }>;
}
//# sourceMappingURL=books.service.d.ts.map