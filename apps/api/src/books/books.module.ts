import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { BookRepository } from './repository/bookRepository';
import { UsersService } from '@/users/users.service';
import { AuthGuard } from '@/auth/auth.guard';

@Module({
  providers: [
    AuthGuard,
    BooksService,
    BooksResolver,
    BookRepository,
    UsersService,
  ],
})
export class BooksModule {}
