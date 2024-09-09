import { Controller, Get, Query } from '@nestjs/common';
import { NotionService } from './notion/notion.service';

@Controller('auth/callback')
export class AuthController {
  constructor(private notionService: NotionService) {}

  @Get('notion')
  async notionHandler(@Query() query: { code: string; state: string }) {
    this.notionService.authCallbackHandler(query.code);
  }
}
