import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { BookRepository } from './repository/bookRepository';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [BooksService, BooksResolver, BookRepository, ConfigService],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
