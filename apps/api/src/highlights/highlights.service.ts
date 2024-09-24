import { Injectable, Logger } from '@nestjs/common';
import { HighlightRepository } from './repository/highlightRepository';
import { Highlight, HighlightColor } from './models/highlight.model';
import { hash } from '@/utils/hash';
import { NewHighlightInput } from './dto/new-highlight.input';
import { AuthenticatedUser } from '@/types';

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

  async create(
    user: AuthenticatedUser,
    highlight: NewHighlightInput,
    bookId: string,
    asin: string,
  ) {
    return await this.createCore(user, highlight, bookId, asin);
  }

  private async createCore(
    user: AuthenticatedUser,
    highlight: NewHighlightInput,
    bookId: string,
    asin: string,
  ) {
    const id = hash(highlight.text);
    const existedHighlight = await this.highlightRepository.exists(user, id);
    if (existedHighlight) {
      Logger.warn('Cannot create new highlight because it is already existed.');

      return existedHighlight;
    }

    return this.highlightRepository.save(user, bookId, asin, {
      id: id,
      ...highlight,
    });
  }
}
