import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, isFullBlock, isFullPage, isFullUser } from '@notionhq/client';
import {
  ChildDatabaseBlockObjectResponse,
  OauthTokenResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { Database } from '~/types/database.types';
import { UsersService } from '~/users/users.service';

@Injectable()
export class NotionService {
  private notion: Client;
  constructor(
    private configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    this.notion = new Client({
      auth: this.configService.get<string>('NOTION_TOKEN'),
    });
  }

  async authCallbackHandler(code: string) {
    Logger.log({
      code,
      grant_type: 'authorization_code',
      redirect_uri: this.configService.get('NOTION_REDIRECT_URL'),
      client_id: this.configService.get('NOTION_CLIENT_ID'),
      client_secret: this.configService.get('NOTION_CLIENT_SECRET'),
    });
    const response = await this.notion.oauth.token({
      code,
      grant_type: 'authorization_code',
      redirect_uri: this.configService.get('NOTION_REDIRECT_URL'),
      client_id: this.configService.get('NOTION_CLIENT_ID'),
      client_secret: this.configService.get('NOTION_CLIENT_SECRET'),
    });

    Logger.log(response);
    if (response.owner.type !== 'user' || !isFullUser(response.owner.user)) {
      return {
        error: 'Invalid user',
      };
    }

    this.usersService.createUser({
      user: {
        id: response.bot_id,
        notion_uid: response.owner.user.id,
        avatar_url: response.owner.user.avatar_url,
        bot_id: response.bot_id,
        name: response.owner.user.name,
        workspace_id: response.workspace_id,
        workspace_name: response.workspace_name,
        workspace_icon: response.workspace_icon,
      },
      page: await this.buildPage(response),
      secret: {
        access_token: response.access_token,
        user_id: response.bot_id,
      },
    });

    const url = await this.notion.pages
      .retrieve({
        page_id: response.duplicated_template_id,
      })
      .then((page) => (isFullPage(page) ? page.url : 'https://www.notion.so/'))
      .catch(() => 'https://www.notion.so/');

    return {
      session_token: response.bot_id,
      redirect_url: url,
    };
  }

  private async buildPage(
    response: OauthTokenResponse,
  ): Promise<Database['public']['Tables']['NotionPage']['Insert']> {
    if (!response.duplicated_template_id) {
      return {
        user_id: response.bot_id,
      };
    }

    const children = await this.notion.blocks.children.list({
      block_id: response.duplicated_template_id,
    });

    const databases = children.results
      .filter(isFullBlock)
      .filter(
        (block): block is ChildDatabaseBlockObjectResponse =>
          block.type === 'child_database',
      )
      .map((block) => ({
        title: block.child_database.title,
        id: block.id,
      }));

    return {
      user_id: response.bot_id,
      page_id: response.duplicated_template_id,
      books_db_id: databases.find((db) => db.title === 'Books')?.id,
      highlights_db_id: databases.find((db) => db.title === 'Highlights')?.id,
    };
  }
}
