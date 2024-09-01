import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'The Book model' })
export class Book {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  author: string;

  @Field({ nullable: true })
  asin?: string;

  @Field({ nullable: true })
  url?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  lastAnnotatedAt?: Date;
}
