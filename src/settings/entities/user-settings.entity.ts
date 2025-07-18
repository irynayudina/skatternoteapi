import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserSettings {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;

  @Field()
  preferredTheme: string;

  @Field({ nullable: true })
  desktopBackground?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
} 