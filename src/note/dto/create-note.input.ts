import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsOptional, MinLength, IsArray, IsNumber, IsBoolean } from 'class-validator';

@InputType()
export class CreateNoteInput {
  @Field()
  @IsString()
  @MinLength(1)
  title: string;

  @Field()
  @IsString()
  content: string;

  @Field(() => Int)
  @IsNumber()
  desktopId: number;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isPinned?: boolean;
} 