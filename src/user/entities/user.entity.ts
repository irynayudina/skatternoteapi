import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Desktop } from '../../desktop/entities/desktop.entity';

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