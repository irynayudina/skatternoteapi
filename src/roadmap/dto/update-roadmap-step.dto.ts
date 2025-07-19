import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

@InputType()
export class UpdateRoadmapStepDto {
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