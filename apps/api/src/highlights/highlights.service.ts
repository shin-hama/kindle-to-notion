import { Injectable, Logger } from '@nestjs/common';
import { HighlightRepository } from './repository/highlightRepository';
import { Highlight, HighlightColor } from './models/highlight.model';
import { hash } from 'src/utils/hash';
import { NewHighlightInput } from './dto/new-highlight.input';

@Injectable()
export class HighlightsService {
  constructor(private highlightRepository: HighlightRepository) {}

  async find(id: string) {
    return {
      id: id,
      text: 'Hello World',
      color: HighlightColor.YELLOW,
      book: {
        id: '1',
        title: 'Hello World',
        author: 'John Doe',
      },
    } satisfies Highlight;
  }

  async findAll() {
    return [] satisfies Highlight[];
  }

  async create(data: NewHighlightInput) {
    const id = hash(data.text);
    const existedHighlight = await this.highlightRepository.exists(
      'b08e0db3e6584e6887fed9786c62c153',
      id,
    );
    if (existedHighlight) {
      Logger.warn('Cannot create new highlight because it is already existed.');

      return existedHighlight;
    }

    const { bookId, ...highlightData } = data;
    return this.highlightRepository.save(
      'b08e0db3e6584e6887fed9786c62c153',
      bookId,
      {
        id: id,
        ...highlightData,
      },
    );
  }

  async createBulk(data: Array<NewHighlightInput>): Promise<Array<Highlight>> {
    const highlightPromises = data.map((highlight) => this.create(highlight));
    return Promise.all(highlightPromises);
  }
}
