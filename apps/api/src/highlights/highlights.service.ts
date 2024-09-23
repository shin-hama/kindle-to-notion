import { Injectable, Logger } from '@nestjs/common';
import { HighlightRepository } from './repository/highlightRepository';
import { Highlight, HighlightColor } from './models/highlight.model';
import { hash } from '@/utils/hash';
import { NewHighlightInput } from './dto/new-highlight.input';
import { AuthenticatedUser } from '@/types';
import { BookRepository } from '@/books/repository/bookRepository';
import { Book } from '@/books/models/book.model';

@Injectable()
export class HighlightsService {
  constructor(
    private highlightRepository: HighlightRepository,
    private bookRepository: BookRepository,
  ) {}

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

  async create(user: AuthenticatedUser, highlight: NewHighlightInput) {
    const book = await this.bookRepository.exists(user, highlight.bookId);

    return await this.createCore(user, highlight, book);
  }

  async createBulk(
    user: AuthenticatedUser,
    highlights: Array<NewHighlightInput>,
  ): Promise<Array<Highlight>> {
    const results: Highlight[] = [];
    for (const group of this.groupByBookId(highlights)) {
      const book = await this.bookRepository.exists(user, group.bookId);

      for (const highlight of group.highlights) {
        results.push(await this.createCore(user, highlight, book));
        // Wait 0.5s to avoid rate limit
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    return results;
  }

  private async createCore(
    user: AuthenticatedUser,
    highlight: NewHighlightInput,
    book: Book,
  ) {
    const id = hash(highlight.text);
    const existedHighlight = await this.highlightRepository.exists(user, id);
    if (existedHighlight) {
      Logger.warn('Cannot create new highlight because it is already existed.');

      return existedHighlight;
    }

    const { bookId, ...highlightData } = highlight;
    return this.highlightRepository.save(user, bookId, book.asin, {
      id: id,
      ...highlightData,
    });
  }

  private groupByBookId(highlights: Array<NewHighlightInput>) {
    const map = highlights.reduce(
      (acc, highlight) => {
        if (!acc[highlight.bookId]) {
          acc[highlight.bookId] = [];
        }
        acc[highlight.bookId].push(highlight);
        return acc;
      },
      {} as Record<string, Array<NewHighlightInput>>,
    );

    // zip the keys and values
    return Object.entries(map).map(([bookId, highlights]) => ({
      bookId,
      highlights,
    }));
  }
}
