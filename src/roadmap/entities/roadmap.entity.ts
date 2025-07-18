import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class RoadmapStep {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  order: number;

  @Field()
  isCompleted: boolean;

  @Field(() => Int)
  roadmapId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class Roadmap {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  desktopId: number;

  @Field(() => Int)
  userId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [RoadmapStep], { nullable: true })
  steps?: RoadmapStep[];
} 