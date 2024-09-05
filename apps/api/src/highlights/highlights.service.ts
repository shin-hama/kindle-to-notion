import { BadRequestException, Injectable } from '@nestjs/common';
import { HighlightRepository } from './repository/highlightRepository';
import { Highlight, HighlightColor } from './models/highlight.model';
import { hash } from 'src/utils/hash';
import {
  NewHighlightInput,
  NewHighlightsInput,
} from './dto/new-highlight.input';

@Injectable()
export class HighlightsService {
  constructor(private highlightRepository: HighlightRepository) {}

  async find(id: string) {
    return {
      id: id,
      text: 'Hello World',
      color: HighlightColor.YELLOW,
    } satisfies Highlight;
  }

  async findAll() {
    return [] satisfies Highlight[];
  }

  async create(data: NewHighlightInput) {
    const id = hash(data.text);
    const existsHighlight = await this.highlightRepository.exists(
      'b08e0db3e6584e6887fed9786c62c153',
      id,
    );
    if (existsHighlight) {
      throw new BadRequestException('Highlight already exists');
    }

    const highlight: Highlight = {
      id: id,
      ...data,
    };
    return this.highlightRepository.save(
      'b08e0db3e6584e6887fed9786c62c153',
      highlight,
    );
  }

  async createBulk(data: NewHighlightsInput): Promise<Array<Highlight>> {
    const highlightPromises = data.highlights.map((highlight) =>
      this.create(highlight),
    );
    return Promise.all(highlightPromises);
  }
}
