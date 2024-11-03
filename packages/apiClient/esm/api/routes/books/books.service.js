import { createClient } from "../../../deps/jsr.io/@supabase/supabase-js/2.45.4/src/index.js";
import { hash } from "../../libs/hash.js";
export class BooksService {
    constructor(env) {
        Object.defineProperty(this, "supabase", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
    }
    async createBook(newBook, user) {
        const { lastAnnotatedAt, ...bookData } = newBook;
        const { data: books, error } = await this.supabase
            .from("Book")
            .upsert({
            id: hash(bookData.title),
            ...bookData,
        })
            .select();
        if (error) {
            throw error;
        }
        const book = books[0];
        const { error: relationError } = await this.supabase.from("Books_NotionUsers").upsert({
            userId: user.id,
            bookId: book.id,
            lastAnnotatedAt: lastAnnotatedAt,
        });
        if (relationError) {
            throw relationError;
        }
        return book;
    }
}
