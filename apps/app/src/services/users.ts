import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '../types/database.types'
import { encrypt } from '../utils/encrypt'

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
}
