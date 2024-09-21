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
  constructor(
    private configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async authCallbackHandler(code: string) {
    const oauthClient = new Client();
    const response = await oauthClient.oauth.token({
      code,
      grant_type: 'authorization_code',
      redirect_uri: this.configService.get('NOTION_REDIRECT_URL'),
      client_id: this.configService.get('NOTION_CLIENT_ID'),
      client_secret: this.configService.get('NOTION_CLIENT_SECRET'),
    });

    if (response.owner.type !== 'user' || !isFullUser(response.owner.user)) {
      return {
        error: 'Invalid user',
      };
    }
    await this.usersService.createUser({
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
      secret: {
        access_token: response.access_token,
        user_id: response.bot_id,
      },
    });
    Logger.log('Successfully authenticated user');

    Logger.log("Start parsing user's page");

    const userClient = new Client({
      auth: response.access_token,
    });

    for (let i = 0; i < 5; i++) {
      try {
        await this.usersService.connectUserToPage(
          await this.buildPage(userClient, response),
        );

        const url = await userClient.pages
          .retrieve({
            page_id: response.duplicated_template_id,
          })
          .then((page) =>
            isFullPage(page) ? page.url : 'https://www.notion.so/',
          )
          .catch(() => 'https://www.notion.so/');
        return {
          session_token: response.bot_id,
          redirect_url: url,
        };
      } catch (e) {
        // 作成直後のページを取得できないことがあるためリトライ
        Logger.warn(e);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }

  private async buildPage(
    userClient: Client,
    response: OauthTokenResponse,
  ): Promise<Database['public']['Tables']['NotionPage']['Insert']> {
    if (!response.duplicated_template_id) {
      return {
        user_id: response.bot_id,
      };
    }

    const children = await userClient.blocks.children.list({
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
