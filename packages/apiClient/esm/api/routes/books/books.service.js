import { hash } from "../../libs/hash.js";
export class BooksService {
    constructor(supabase) {
        Object.defineProperty(this, "supabase", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: supabase
        });
    }
    async createBook(newBook, user) {
        const { lastAnnotatedAt, ...bookData } = newBook;
        const { data: book, error } = await this.supabase
            .from("Book")
            .upsert({
            id: hash(bookData.title),
            ...bookData,
        })
            .select().single();
        if (error) {
            throw error;
        }
        const { data: bookUser, error: relationError } = await this.supabase.from("Books_NotionUsers").upsert({
            userId: user.id,
            bookId: book.id,
            lastAnnotatedAt: lastAnnotatedAt,
        }).select().single();
        if (relationError) {
            throw relationError;
        }
        return { book, bookUser };
    }
}
