import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Highlight } from './models/highlight.model';
import { HighlightsService } from './highlights.service';
import { NewHighlightInput } from './dto/new-highlight.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '~/auth/auth.guard';

@Resolver(() => Highlight)
export class HighlightsResolver {
  constructor(private highlightService: HighlightsService) {}

  @Query(() => Highlight)
  @UseGuards(AuthGuard)
  async highlight(
    @Args('id') id: string,
    @Context() context,
  ): Promise<Highlight> {
    console.log(context.req.user);
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
    @Args('newHighlights', {
      type: () => [NewHighlightInput],
    })
    data: Array<NewHighlightInput>,
  ): Promise<Array<Highlight>> {
    return this.highlightService.createBulk(data);
  }
}
