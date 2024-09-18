import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/types/database.types';
import { encrypt } from '~/utils/encrypt';

@Injectable()
export class UsersService {
  private client: SupabaseClient<Database>;
  private encryptionKey: string;
  constructor(private configService: ConfigService) {
    this.client = createClient<Database>(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_SERVICE_ROLE_KEY'),
    );

    this.encryptionKey = this.configService.get('ENCRYPTION_KEY');
    if (!this.encryptionKey) {
      throw Error('ENCRYPTION_KEY is not set');
    }
  }

  async createUser({
    user,
    page,
    secret,
  }: {
    user: Database['public']['Tables']['NotionUser']['Insert'];
    page: Database['public']['Tables']['NotionPage']['Insert'];
    secret: Database['public']['Tables']['NotionSecret']['Insert'];
  }) {
    const userResult = await this.client
      .from('NotionUser')
      .insert([user])
      .select();
    const pageResult = await this.client
      .from('NotionPage')
      .insert([page])
      .select();

    const encryptedSecret = encrypt(secret.access_token, this.encryptionKey);
    const secretResult = await this.client
      .from('NotionSecret')
      .insert([
        {
          ...secret,
          access_token: encryptedSecret.encryptedData,
          iv: encryptedSecret.iv,
        },
      ])
      .select();
    Logger.log({
      userResult,
      pageResult,
      test: secretResult,
    });
  }
}
