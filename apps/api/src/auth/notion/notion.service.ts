import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, isFullUser } from '@notionhq/client';
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
      return response;
    }
    this.usersService.createUser({
      user: {
        id: response.bot_id,
        notion_uid: response.owner.user.id,
        avatar_url: response.owner.user.avatar_url,
        bot_id: response.bot_id,
        name: response.owner.user.name,
      },
      page: {
        user_id: response.bot_id,
        page_id: response.duplicated_template_id,
        workspace_id: response.workspace_id,
        workspace_name: response.workspace_name,
        workspace_icon: response.workspace_icon,
      },
      secret: {
        access_token: response.access_token,
        user_id: response.bot_id,
      },
    });

    return response;
  }
}
