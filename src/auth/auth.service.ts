import { Injectable, ConflictException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserWithUsernameDto } from './dto/create-user-with-username.dto';

export interface Auth0User {
  sub: string; // Auth0 user ID
  email: string;
  email_verified: boolean;
  name?: string;
  nickname?: string;
  picture?: string;
  updated_at: string;
}

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async createOrUpdateUser(auth0User: Auth0User) {
    const { sub, email, name, nickname, picture } = auth0User;
    
    // Check if user exists by Auth0 ID
    let user = await this.userService.findByAuth0Id(sub);
    
    if (user) {
      // Update existing user
      try {
        return await this.userService.updateByAuth0Id(sub, {
          email,
          username: nickname || name || email.split('@')[0],
          picture,
        });
      } catch (error) {
        // If update fails, try to create a new user
        console.error('Failed to update user, creating new one:', error);
        return await this.userService.createAuth0User({
          auth0Id: sub,
          email,
          username: nickname || name || email.split('@')[0],
          picture,
        });
      }
    }

    // Check if user exists by email but doesn't have auth0Id
    const existingUserByEmail = await this.userService.findByEmail(email);
    if (existingUserByEmail && !existingUserByEmail.auth0Id) {
      // Update existing user to add auth0Id
      try {
        return await this.userService.updateExistingUserWithAuth0Id(existingUserByEmail.id, sub, {
          email,
          username: nickname || name || email.split('@')[0],
          picture,
        });
      } catch (error) {
        console.error('Failed to update existing user with auth0Id:', error);
        // Fall back to creating new user
      }
    }

    // Create new user
    return await this.userService.createAuth0User({
      auth0Id: sub,
      email,
      username: nickname || name || email.split('@')[0],
      picture,
    });
  }

  async createUserWithCustomUsername(createUserDto: CreateUserWithUsernameDto) {
    const { sub, email, username, name, nickname, picture } = createUserDto;
    
    // Check if username is already taken
    const existingUserByUsername = await this.userService.findByUsername(username);
    if (existingUserByUsername) {
      throw new ConflictException('Username is already taken');
    }

    // Check if user exists by Auth0 ID
    let user = await this.userService.findByAuth0Id(sub);
    
    if (user) {
      // Update existing user with custom username
      try {
        return await this.userService.updateByAuth0Id(sub, {
          email,
          username,
          picture,
        });
      } catch (error) {
        console.error('Failed to update user with custom username:', error);
        throw error;
      }
    }

    // Check if user exists by email but doesn't have auth0Id
    const existingUserByEmail = await this.userService.findByEmail(email);
    if (existingUserByEmail && !existingUserByEmail.auth0Id) {
      // Update existing user to add auth0Id and custom username
      try {
        return await this.userService.updateExistingUserWithAuth0Id(existingUserByEmail.id, sub, {
          email,
          username,
          picture,
        });
      } catch (error) {
        console.error('Failed to update existing user with auth0Id and custom username:', error);
        // Fall back to creating new user
      }
    }

    // Create new user with custom username
    return await this.userService.createAuth0User({
      auth0Id: sub,
      email,
      username,
      picture,
    });
  }

  async getUserByAuth0Id(auth0Id: string) {
    return await this.userService.findByAuth0Id(auth0Id);
  }
} 