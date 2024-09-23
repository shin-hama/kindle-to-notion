import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';
import { decrypt, encrypt } from '@/utils/encrypt';
import { Client, isFullPage } from '@notionhq/client';
import { AuthenticatedUser } from '@/types';

type NotionUser = {
  id: string;
  name: string;
  avatarUrl: string;
  pageUrl: string;
};

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

  async me(auth: AuthenticatedUser) {
    const { NotionSecret, ...user } = auth;

    const notion = new Client({
      auth: NotionSecret.access_token,
    });
    const page = await notion.pages.retrieve({
      page_id: user.NotionPage.page_id,
    });

    return {
      id: user.id,
      name: user.name,
      avatarUrl: user.avatar_url,
      pageUrl: isFullPage(page) ? page.url : null,
    } satisfies NotionUser;
  }

  async veryfyAdmin(sessionToken: string) {
    const { data, error } = await this.client
      .from('NotionUser')
      .select(
        '*, NotionSecret(access_token, iv), NotionPage(page_id, books_db_id, highlights_db_id)',
      )
      .eq('bot_id', sessionToken)
      .single();
    if (error) {
      throw error;
    }
    return {
      ...data,
      NotionSecret: {
        ...data.NotionSecret,
        access_token: decrypt(
          data.NotionSecret.access_token,
          data.NotionSecret.iv,
          this.encryptionKey,
        ),
      },
    };
  }

  async createUser({
    user,
    secret,
  }: {
    user: Database['public']['Tables']['NotionUser']['Insert'];
    secret: Database['public']['Tables']['NotionSecret']['Insert'];
  }) {
    await this.client.from('NotionUser').upsert([user]).select();

    const encryptedSecret = encrypt(secret.access_token, this.encryptionKey);
    await this.client
      .from('NotionSecret')
      .upsert([
        {
          ...secret,
          access_token: encryptedSecret.encryptedData,
          iv: encryptedSecret.iv,
        },
      ])
      .select();
  }

  async connectUserToPage(
    page: Database['public']['Tables']['NotionPage']['Insert'],
  ) {
    await this.client.from('NotionPage').upsert([page]).select();
  }
}