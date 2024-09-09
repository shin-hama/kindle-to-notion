import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { NotionService } from './notion/notion.service';

@Module({
  controllers: [AuthController],
  providers: [NotionService],
})
export class AuthModule {}
