import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { NotionService } from './notion/notion.service';
import { UsersService } from '@/users/users.service';

@Module({
  controllers: [AuthController],
  providers: [NotionService, UsersService],
})
export class AuthModule {}
