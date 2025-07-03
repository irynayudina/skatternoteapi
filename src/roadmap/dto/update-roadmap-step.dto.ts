import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class UpdateRoadmapStepDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
} 