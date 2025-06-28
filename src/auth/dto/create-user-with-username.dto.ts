import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateUserWithUsernameDto {
  @IsString()
  @IsNotEmpty()
  sub: string; // Auth0 user ID

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string; // Custom username

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsString()
  picture?: string;

  @IsOptional()
  @IsString()
  updated_at?: string;
} 