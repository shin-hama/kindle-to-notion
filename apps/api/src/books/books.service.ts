import { Injectable } from '@nestjs/common';
import { BookRepository } from './repository/bookRepository';
import { Book } from './models/book.model';
import { NewBookInput } from './dto/new-book.input';
import { hash } from 'src/utils/hash';

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

  async create(data: NewBookInput): Promise<Book> {
    const book: Book = {
      id: hash(data.title),
      title: data.title,
      author: data.author,
      asin: data.asin,
      imageUrl: data.imageUrl,
      lastAnnotatedAt: data.lastAnnotatedAt,
      url: data.url,
    };
    return this.bookRepository.save('54977274208942b487b5408a85357e9e', book);
  }
}
