import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('kindle')
export class KindleController {
  constructor() {}

  @Get('open')
  openKindle(@Req() req: Request, @Res() res: Response) {
    const { asin } = req.query;
    if (!asin) {
      return res.redirect(`kindle://book?action=open`);
    }
    return res.redirect(`kindle://book?action=open&asin=${asin}`);
  }
}
