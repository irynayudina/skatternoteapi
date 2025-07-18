import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

@InputType()
export class CreateUserWithUsernameInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  sub: string; // Auth0 user ID

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  username: string; // Custom username

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  nickname?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  picture?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  updated_at?: string;
} 