import { createClient, SupabaseClient } from "jsr:@supabase/supabase-js";
import { Database } from "../../types/database.types.ts";
import { AuthenticatedUser, Env } from "../../types/index.ts";
import { CreateBookModel } from "./books.dto.ts";
import { hash } from "../../libs/hash.ts";

export class BooksService {
  private supabase: SupabaseClient<Database>;

  constructor(env: Env) {
    this.supabase = createClient(
      env.SUPABASE_URL,
      env.SUPABASE_SERVICE_ROLE_KEY,
    );
  }

  async createBook(newBook: CreateBookModel, user: AuthenticatedUser) {
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

    const { error: relationError } = await this.supabase.from(
      "Books_NotionUsers",
    ).upsert({
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
