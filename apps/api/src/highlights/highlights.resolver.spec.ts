import { Test, TestingModule } from '@nestjs/testing';
import { HighlightsResolver } from './highlights.resolver';
import { HighlightsService } from './highlights.service';
import { HighlightRepository } from './repository/highlightRepository';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('HighlightsResolver', () => {
  let resolver: HighlightsResolver;

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

    resolver = module.get<HighlightsResolver>(HighlightsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
