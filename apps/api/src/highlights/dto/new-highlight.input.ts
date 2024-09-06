import { Field, InputType } from '@nestjs/graphql';
import { HighlightColor } from '../models/highlight.model';

@InputType()
export class NewHighlightInput {
  @Field(() => HighlightColor)
  color: HighlightColor;

  @Field()
  text: string;

  @Field({ nullable: true, defaultValue: '' })
  location?: string;

  @Field({ nullable: true, defaultValue: '' })
  page?: string;

  @Field({ nullable: true, defaultValue: null })
  note?: string;

  @Field({ nullable: true, defaultValue: new Date() })
  createdDate?: Date;

  @Field()
  bookId: string;
}

@InputType()
export class NewHighlightsInput {
  @Field(() => [NewHighlightInput])
  highlights: Array<NewHighlightInput>;
}
