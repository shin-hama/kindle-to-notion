import { Injectable } from '@nestjs/common';
import { createPage } from "./notion/create-page"
import { ConfigService } from '@nestjs/config';
import { Client } from '@notionhq/client';


@Injectable()
export class AppService {
  private notion: Client
  constructor(
    private configService: ConfigService
  ) {
    this.notion = new Client({
      auth: this.configService.get<string>("NOTION_TOKEN")
    });
  }
  getHello(): string {
    try {      
      createPage(this.notion, "b08e0db3e6584e6887fed9786c62c153")
      return 'Hello World!';
    }
    catch (e){
      console.log(e)
    }
  }
}
