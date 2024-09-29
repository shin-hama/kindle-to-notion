import { Database } from '../../types/database.types'

export type CreateHighlightModel = Omit<
  Database['public']['Tables']['Highlight']['Insert'],
  'userId'
>
