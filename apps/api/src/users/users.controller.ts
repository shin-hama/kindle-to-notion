import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@/auth/auth.guard';
import { CurrentUser } from '@/auth/auth.decorator';
import { AuthenticatedUser } from '@/types';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/me')
  @UseGuards(AuthGuard)
  async me(@CurrentUser() user: AuthenticatedUser) {
    return this.usersService.me(user);
  }
}
