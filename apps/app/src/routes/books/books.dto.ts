import { Database } from '../../types/database.types'

export type CreateBookModel = Omit<Database['public']['Tables']['Book']['Insert'], 'id'> & {
  lastAnnotatedAt: Database['public']['Tables']['Books_NotionUsers']['Insert']['lastAnnotatedAt']
}
