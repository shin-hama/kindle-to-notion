import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '../types/database.types'
import { decrypt, encrypt } from '../utils/encrypt'
import { AuthenticatedUser } from '../types'

export class UsersService {
  private supabase: SupabaseClient<Database>
  private encryptionKey: string

  constructor(url: string, key: string, encryptionKey: string) {
    this.supabase = this.createSupabaseClient(url, key)
    this.encryptionKey = encryptionKey
  }
  saveUser = async (data: Database['public']['Tables']['NotionUser']['Insert']) => {
    const { data: user, error } = await this.supabase.from('NotionUser').upsert([data])
    if (error) {
      throw error
    }
    return user
  }

  savePage = async (data: Database['public']['Tables']['NotionPage']['Insert']) => {
    const { data: page, error } = await this.supabase.from('NotionPage').upsert([data])
    if (error) {
      throw error
    }

    return page
  }

  saveSecret = async (data: { access_token: string; user_id: string }) => {
    const encrypted = encrypt(data.access_token, this.encryptionKey)
    const { data: secret, error } = await this.supabase
      .from('NotionSecret')
      .upsert([
        {
          access_token: encrypted.encryptedData,
          iv: encrypted.iv,
          user_id: data.user_id,
        },
      ])
      .select()

    if (error) {
      throw error
    }

    return secret
  }

  createSupabaseClient = (url: string, key: string) => {
    return createClient<Database>(url, key)
  }

  verifyAdmin = async (sessionToken: string): Promise<AuthenticatedUser | null> => {
    const { data, error } = await this.supabase
      .from('NotionUser')
      .select(
        '*, NotionSecret(access_token, iv), NotionPage(page_id, books_db_id, highlights_db_id)',
      )
      .eq('bot_id', sessionToken)
      .single()
    if (error) {
      throw error
    }
    if (!data || !data.NotionSecret || !data.NotionPage) {
      return null
    }

    return {
      ...data,
      NotionPage: data.NotionPage,
      NotionSecret: {
        ...data.NotionSecret,
        access_token: decrypt(
          data.NotionSecret.access_token,
          data.NotionSecret.iv,
          this.encryptionKey,
        ),
      },
    }
  }
}
