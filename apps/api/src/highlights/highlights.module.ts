import { Module } from '@nestjs/common';
import { HighlightsService } from './highlights.service';
import { HighlightsResolver } from './highlights.resolver';
import { HighlightRepository } from './repository/highlightRepository';
import { AuthGuard } from '@/auth/auth.guard';
import { UsersService } from '@/users/users.service';

@Module({
  providers: [
    AuthGuard,
    HighlightsService,
    HighlightsResolver,
    HighlightRepository,
    UsersService,
  ],
})
export class HighlightsModule {}
