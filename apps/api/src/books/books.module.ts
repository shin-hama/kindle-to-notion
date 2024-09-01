import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { BookRepository } from './repository/bookRepository';

@Module({
  providers: [BooksService, BooksResolver, BookRepository],
})
export class BooksModule {}
