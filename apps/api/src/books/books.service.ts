import { Injectable } from '@nestjs/common';
import { BookRepository } from './repository/bookRepository';
import { Book } from './models/book.model';
import { NewBookInput } from './dto/new-book.input';
import { hash } from '~/utils/hash';
import { Logger } from '@nestjs/common';
import { AuthenticatedUser } from '~/types';

@Injectable()
export class BooksService {
  constructor(private bookRepository: BookRepository) {}

  async find(id: string): Promise<Book> {
    return {
      id: id,
      title: 'Hello World',
      author: 'John Doe',
      asin: '1234567890',
      imageUrl: 'https://example.com/image.jpg',
      lastAnnotatedAt: new Date(),
      url: 'https://example.com',
    };
  }

  async findAll(): Promise<Book[]> {
    return [];
  }

  async create(user: AuthenticatedUser, data: NewBookInput): Promise<Book> {
    const bookId = hash(data.title);
    const existsBook = await this.bookRepository.exists(user, bookId);
    if (existsBook) {
      Logger.warn('Cannot create new book because it is already existed.');
      return existsBook;
    }

    const book: Book = {
      id: bookId,
      title: data.title,
      author: data.author,
      asin: data.asin,
      imageUrl: data.imageUrl,
      lastAnnotatedAt: data.lastAnnotatedAt,
      url: data.url,
    };
    return this.bookRepository.save(user, book);
  }
}
