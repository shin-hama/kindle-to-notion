import { Controller, Get, Logger, Query, Res } from '@nestjs/common';
import { NotionService } from './notion/notion.service';
import { Response } from 'express';
import { SESSION_TOKEN_KEY } from '@kino/shared';

@Controller('auth/callback')
export class AuthController {
  constructor(private notionService: NotionService) {}

  @Get('notion')
  async notionHandler(
    @Query() query: { code: string; state: string },
    @Res() res: Response,
  ) {
    Logger.log(query);
    try {
      const result = await this.notionService.authCallbackHandler(query.code);
      res.cookie(SESSION_TOKEN_KEY, result.bot_id, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
      return res.send("You're logged in!");
    } catch {
      return res
        .status(500)
        .send('Error logging in, please try again or contact support');
    }
  }
}
