import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreateDesktopDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
} 