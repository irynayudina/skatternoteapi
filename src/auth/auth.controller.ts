import { Controller, Post, Body, Get, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService, Auth0User } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserWithUsernameDto } from './dto/create-user-with-username.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('create-user')
  async createUser(@Body() auth0User: Auth0User) {
    try {
      // Validate required fields
      if (!auth0User.sub || !auth0User.email) {
        throw new HttpException('Missing required fields: sub and email', HttpStatus.BAD_REQUEST);
      }

      return await this.authService.createOrUpdateUser(auth0User);
    } catch (error) {
      console.error('Error in create-user endpoint:', error);
      
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException(
        'Failed to create or update user',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('create-user-with-username')
  async createUserWithUsername(@Body() createUserDto: CreateUserWithUsernameDto) {
    try {
      // Validate required fields
      if (!createUserDto.sub || !createUserDto.email || !createUserDto.username) {
        throw new HttpException('Missing required fields: sub, email, and username', HttpStatus.BAD_REQUEST);
      }

      return await this.authService.createUserWithCustomUsername(createUserDto);
    } catch (error) {
      console.error('Error in create-user-with-username endpoint:', error);
      
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException(
        'Failed to create user with custom username',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(@Request() req) {
    try {
      const auth0Id = req.user?.sub;
      
      if (!auth0Id) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
      
      return await this.authService.getUserByAuth0Id(auth0Id);
    } catch (error) {
      console.error('Error in profile endpoint:', error);
      
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException(
        'Failed to get user profile',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
} 