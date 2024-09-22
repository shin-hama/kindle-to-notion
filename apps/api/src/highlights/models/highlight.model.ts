import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Book } from '@/books/models/book.model';

export enum HighlightColor {
  BLUE = 'blue',
  ORANGE = 'orange',
  PINK = 'pink',
  YELLOW = 'yellow',
}

registerEnumType(HighlightColor, {
  name: 'HighlightColor',
});

@ObjectType({ description: 'The Highlight model' })
export class Highlight {
  @Field(() => ID)
  id: string;

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

  @Field({ nullable: true, defaultValue: null })
  createdDate?: Date;

  @Field(() => Book)
  book: Book;
}
