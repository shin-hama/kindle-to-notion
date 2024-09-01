import { Test, TestingModule } from '@nestjs/testing';
import { HighlightsResolver } from './highlights.resolver';

describe('HighlightsResolver', () => {
  let resolver: HighlightsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HighlightsResolver],
    }).compile();

    resolver = module.get<HighlightsResolver>(HighlightsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
