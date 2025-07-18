import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Desktop {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  picture?: string;

  @Field()
  role: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  auth0Id?: string;

  @Field(() => [Desktop], { nullable: true })
  desktops?: Desktop[];
} 