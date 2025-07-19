import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { Auth0UserInput } from './entities/auth0-user.entity';
import { CreateUserWithUsernameInput } from './dto/create-user-with-username.input';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async createOrUpdateUser(@Args('auth0User') auth0User: Auth0UserInput) {
    return this.authService.createOrUpdateUser(auth0User);
  }

  @Mutation(() => User)
  async createUserWithCustomUsername(@Args('createUserDto') createUserDto: CreateUserWithUsernameInput) {
    return this.authService.createUserWithCustomUsername(createUserDto);
  }

  @Query(() => User, { name: 'userProfile', nullable: true })
  async getUserByAuth0Id(@Args('auth0Id') auth0Id: string) {
    return await this.authService.getUserByAuth0Id(auth0Id);
  }
} 