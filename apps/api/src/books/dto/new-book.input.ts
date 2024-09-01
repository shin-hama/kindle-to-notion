import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewBookInput {
  @Field()
  title: string;

  @Field()
  author: string;

  @Field({ nullable: true, defaultValue: '' })
  asin?: string;

  @Field({ nullable: true, defaultValue: null })
  url?: string;

  @Field({ nullable: true, defaultValue: null })
  imageUrl?: string;

  @Field({ nullable: true, defaultValue: null })
  lastAnnotatedAt?: Date;
}
