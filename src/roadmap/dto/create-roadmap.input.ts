import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsArray, ValidateNested, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateRoadmapStepInput {
  @Field()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  order?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}

@InputType()
export class CreateRoadmapInput {
  @Field()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => Int)
  @IsNumber()
  desktopId: number;

  @Field(() => [CreateRoadmapStepInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRoadmapStepInput)
  steps: CreateRoadmapStepInput[];
} 