import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TagCount {
  @Field(() => Int)
  notes: number;
}

@ObjectType()
export class Tag {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  color?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => TagCount, { nullable: true })
  _count?: TagCount;
} 