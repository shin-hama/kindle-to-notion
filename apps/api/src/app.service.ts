import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}
  getHello(): string {
    try {
      return 'Hello World!';
    } catch (e) {
      console.log(e);
    }
  }
}
