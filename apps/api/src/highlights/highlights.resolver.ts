import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Highlight } from './models/highlight.model';
import { HighlightsService } from './highlights.service';
import { NewHighlightInput } from './dto/new-highlight.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/auth/auth.guard';
import { CurrentUser } from '@/auth/auth.decorator';
import { AuthenticatedUser } from '@/types';

@Resolver(() => Highlight)
export class HighlightsResolver {
  constructor(private highlightService: HighlightsService) {}

  @Query(() => Highlight)
  @UseGuards(AuthGuard)
  async highlight(
    @Args('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<Highlight> {
    console.log(user);
    return this.highlightService.find(id);
  }

  @Mutation(() => Highlight)
  @UseGuards(AuthGuard)
  async addHighlight(
    @Args('newHighlight') data: NewHighlightInput,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<Highlight> {
    return this.highlightService.create(user, data);
  }

  @Mutation(() => [Highlight])
  @UseGuards(AuthGuard)
  async addHighlights(
    @Args('newHighlights', {
      type: () => [NewHighlightInput],
    })
    data: Array<NewHighlightInput>,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<Array<Highlight>> {
    return this.highlightService.createBulk(user, data);
  }
}
