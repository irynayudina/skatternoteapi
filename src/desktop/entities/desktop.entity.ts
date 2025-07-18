import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class DesktopCount {
  @Field(() => Int)
  notes: number;
}

@ObjectType()
export class Note {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  isPinned: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class Desktop {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  userId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [Note], { nullable: true })
  notes?: Note[];

  @Field(() => DesktopCount, { nullable: true })
  _count?: DesktopCount;
} 