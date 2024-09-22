import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Book } from './models/book.model';
import { BooksService } from './books.service';
import { NewBookInput } from './dto/new-book.input';
import { AuthGuard } from '@/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '@/auth/auth.decorator';
import { AuthenticatedUser } from '@/types';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query(() => Book)
  @UseGuards(AuthGuard)
  async book(@Args('id') id: string): Promise<Book> {
    return this.booksService.find(id);
  }
  s;

  @Query(() => [Book])
  @UseGuards(AuthGuard)
  async books(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Mutation(() => Book)
  @UseGuards(AuthGuard)
  async addBook(
    @CurrentUser() user: AuthenticatedUser,
    @Args('newBookData') data: NewBookInput,
  ): Promise<Book> {
    return this.booksService.create(user, data);
  }
}
