import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Utility {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field()
  name: string;

  @Field()
  link: string;

  @Field({ nullable: true })
  icon?: string;

  @Field({ nullable: true })
  picture?: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  description?: string;
}

