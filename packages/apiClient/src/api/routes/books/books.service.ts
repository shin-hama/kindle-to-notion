import { SupabaseClient } from "../../../deps/jsr.io/@supabase/supabase-js/2.45.4/src/index.js";
import { Database } from "../../../types/database.types.js";
import { AuthenticatedUser } from "../../../types/index.js";
import { CreateBookModel } from "./books.dto.js";
import { hash } from "../../libs/hash.js";

export class BooksService {
  constructor(private supabase: SupabaseClient<Database>) {}

  async createBook(newBook: CreateBookModel, user: AuthenticatedUser) {
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

    const { data: bookUser, error: relationError } = await this.supabase.from(
      "Books_NotionUsers",
    ).upsert({
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
