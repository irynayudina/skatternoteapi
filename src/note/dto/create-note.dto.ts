import { IsString, IsOptional, MinLength, IsArray, IsNumber } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  content: string;

  @IsNumber()
  desktopId: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  isPinned?: boolean;
} 