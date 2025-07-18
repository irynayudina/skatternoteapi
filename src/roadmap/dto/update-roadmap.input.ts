import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsArray, ValidateNested, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class UpdateRoadmapStepInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

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
export class UpdateRoadmapInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => [UpdateRoadmapStepInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateRoadmapStepInput)
  steps?: UpdateRoadmapStepInput[];
} 