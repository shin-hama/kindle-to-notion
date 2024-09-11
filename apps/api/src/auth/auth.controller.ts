import { Controller, Get, Logger, Query, Res } from '@nestjs/common';
import { NotionService } from './notion/notion.service';
import { Response } from 'express';

@Controller('auth/callback')
export class AuthController {
  constructor(private notionService: NotionService) {}

  @Get('notion')
  // @Redirect('https://nestjs.com', 301)
  async notionHandler(
    @Query() query: { code: string; state: string },
    @Res() res: Response,
  ) {
    Logger.log(query);
    try {
      const result = await this.notionService.authCallbackHandler(query.code);
      return res.json({ session_token: result.bot_id });
    } catch {
      res.setHeader('x-session-token', 'session_token');
      res.cookie('session_token', 'session_token', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
      });
      return res.json({ session_token: 'session_token' });
    }
  }
}
