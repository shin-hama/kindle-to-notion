import { Test, TestingModule } from '@nestjs/testing';
import { HighlightsService } from './highlights.service';
import { HighlightsResolver } from './highlights.resolver';
import { HighlightRepository } from './repository/highlightRepository';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('HighlightsService', () => {
  let service: HighlightsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        ConfigService,
        HighlightsService,
        HighlightsResolver,
        HighlightRepository,
      ],
    }).compile();

    service = module.get<HighlightsService>(HighlightsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
