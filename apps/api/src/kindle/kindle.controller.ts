import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('kindle')
export class KindleController {
  constructor() {}

  @Get('open')
  openKindle(@Req() req: Request, @Res() res: Response) {
    const { asin, location } = req.query;
    if (!asin) {
      return res.redirect(`kindle://book?action=open`);
    }
    const query = new URLSearchParams({ asin: asin as string });
    if (location) {
      query.append('location', location as string);
    }

    return res.redirect(`kindle://book?action=open&${query.toString()}`);
  }
}
