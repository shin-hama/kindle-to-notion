import { Module } from '@nestjs/common';
import { HighlightsService } from './highlights.service';
import { HighlightsResolver } from './highlights.resolver';
import { HighlightRepository } from './repository/highlightRepository';

@Module({
  providers: [HighlightsService, HighlightsResolver, HighlightRepository],
})
export class HighlightsModule {}
