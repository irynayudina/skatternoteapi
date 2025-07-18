import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType()
export class Auth0User {
  @Field()
  sub: string; // Auth0 user ID

  @Field()
  email: string;

  @Field()
  email_verified: boolean;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  nickname?: string;

  @Field({ nullable: true })
  picture?: string;

  @Field()
  updated_at: string;
}

@InputType()
export class Auth0UserInput {
  @Field()
  sub: string; // Auth0 user ID

  @Field()
  email: string;

  @Field()
  email_verified: boolean;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  nickname?: string;

  @Field({ nullable: true })
  picture?: string;

  @Field()
  updated_at: string;
} 