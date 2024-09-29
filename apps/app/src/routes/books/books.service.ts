import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '../../types/database.types'
import { AuthenticatedUser, Env } from '../../types'
import { CreateBookModel } from './books.dto'
import { hash } from '../../utils/hash'

export class BooksService {
  private supabase: SupabaseClient<Database>

  constructor(env: Env) {
    this.supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)
  }

  async createBook(newBook: CreateBookModel, user: AuthenticatedUser) {
    const { lastAnnotatedAt, ...bookData } = newBook
    const { data: books, error } = await this.supabase
      .from('Book')
      .upsert({
        id: hash(bookData.title),
        ...bookData,
      })
      .select()

    if (error) {
      throw error
    }
    const book = books[0]

    const { error: relationError } = await this.supabase.from('Books_NotionUsers').upsert({
      userId: user.id,
      bookId: book.id,
      lastAnnotatedAt: lastAnnotatedAt,
    })

    if (relationError) {
      throw relationError
    }

    return book
  }
}
