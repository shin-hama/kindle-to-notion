import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@notionhq/client';

@Injectable()
export class NotionService {
  private notion: Client;
  constructor(private configService: ConfigService) {
    this.notion = new Client();
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
  }
}
