import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Highlight } from './models/highlight.model';
import { HighlightsService } from './highlights.service';
import {
  NewHighlightInput,
  NewHighlightsInput,
} from './dto/new-highlight.input';

@Resolver(() => Highlight)
export class HighlightsResolver {
  constructor(private highlightService: HighlightsService) {}

  @Query(() => Highlight)
  async highlight(@Args('id') id: string): Promise<Highlight> {
    return this.highlightService.find(id);
  }

  @Mutation(() => Highlight)
  async addHighlight(
    @Args('newHighlight') data: NewHighlightInput,
  ): Promise<Highlight> {
    return this.highlightService.create(data);
  }

  @Mutation(() => [Highlight])
  async addHighlights(
    @Args('newHighlights') data: NewHighlightsInput,
  ): Promise<Array<Highlight>> {
    return this.highlightService.createBulk(data);
  }
}
