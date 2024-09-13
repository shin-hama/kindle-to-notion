import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/types/database.types';

@Injectable()
export class UsersService {
  private client: SupabaseClient<Database>;
  constructor(private configService: ConfigService) {
    this.client = createClient<Database>(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_ANON_KEY'),
    );
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
    const test = await this.client
      .from('NotionSecret')
      .insert([secret])
      .select();
    console.log({
      userResult,
      pageResult,
      test,
    });
    return {
      user: userResult.data[0],
      page: pageResult.data[0],
    };
  }
}
