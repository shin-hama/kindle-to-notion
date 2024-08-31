import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@notionhq/client';
import { BookRepository } from './repository/bookRepository';

@Injectable()
export class AppService {
  private notion: Client;
  constructor(
    private configService: ConfigService,
    private bookRepository: BookRepository,
  ) {
    this.notion = new Client({
      auth: this.configService.get<string>('NOTION_TOKEN'),
    });
  }
  getHello(): string {
    try {
      this.bookRepository.saveBook('54977274208942b487b5408a85357e9e', {
        title: 'Hello, World!',
        id: '1',
        asin: '1234567890',
        url: 'https://www.amazon.co.jp/dp/B0D7C1RT4D',
        imageUrl: 'https://m.media-amazon.com/images/I/81regW9suML._SY160.jpg',
        author: 'John Doe',
        updatedAt: new Date(),
      });
      return 'Hello World!';
    } catch (e) {
      console.log(e);
    }
  }
}
