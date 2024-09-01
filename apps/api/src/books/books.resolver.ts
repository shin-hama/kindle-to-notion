import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Book } from './models/book.model';
import { BooksService } from './books.service';
import { NewBookInput } from './dto/new-book.input';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query(() => Book)
  async book(@Args('id') id: string): Promise<Book> {
    return this.booksService.find(id);
  }
  s;

  @Query(() => [Book])
  async books(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Mutation(() => Book)
  async addBook(@Args('newBookData') newBookData: NewBookInput): Promise<Book> {
    return this.booksService.create(newBookData);
  }
}
