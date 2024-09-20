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
      if (result.error) {
        return res.status(500).send(`${result.error}, please try again`);
      }

      res.cookie(SESSION_TOKEN_KEY, result.session_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
      return res.send("You're logged in!").redirect(result.redirect_url);
    } catch {
      return res
        .status(500)
        .send('Error logging in, please try again or contact support');
    }
  }
}
