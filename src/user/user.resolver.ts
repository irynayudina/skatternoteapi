import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async register(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.userService.login(loginUserInput);
  }

  @Query(() => [User], { name: 'users' })
  async findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => String)
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    const result = await this.userService.remove(id);
    return result.message;
  }

  @Query(() => User, { name: 'userByAuth0Id' })
  async findByAuth0Id(@Args('auth0Id') auth0Id: string) {
    return this.userService.findByAuth0Id(auth0Id);
  }

  @Query(() => User, { name: 'userByEmail' })
  async findByEmail(@Args('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Query(() => User, { name: 'userByUsername' })
  async findByUsername(@Args('username') username: string) {
    return this.userService.findByUsername(username);
  }
} 