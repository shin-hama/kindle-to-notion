import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { AuthenticatedUser, Env } from '../types'
import { CreateHighlightModel } from './highlights.model'
import { Database } from '../types/database.types'

export class HighlightsService {
  private supabase: SupabaseClient<Database>
  constructor(env: Env) {
    this.supabase = createClient<Database>(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)
  }

  async getHighlights() {}

  async createHighlight(newHighlight: CreateHighlightModel, user: AuthenticatedUser) {
    const { data, error } = await this.supabase
      .from('Highlight')
      .upsert({ ...newHighlight, userId: user.id })
      .select()

    if (error) {
      throw new Error('Error creating highlight')
    }

    return data
  }
}
