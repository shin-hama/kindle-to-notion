import { Module } from '@nestjs/common';
import { HighlightsService } from './highlights.service';
import { HighlightsResolver } from './highlights.resolver';
import { HighlightRepository } from './repository/highlightRepository';
import { AuthGuard } from '@/auth/auth.guard';
import { UsersService } from '@/users/users.service';
import { BookRepository } from '@/books/repository/bookRepository';

@Module({
  providers: [
    AuthGuard,
    BookRepository,
    HighlightsService,
    HighlightsResolver,
    HighlightRepository,
    UsersService,
  ],
})
export class HighlightsModule {}
