import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

@InputType()
export class UpdateSettingsInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  preferredTheme?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  desktopBackground?: string;
} 