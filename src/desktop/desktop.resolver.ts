import { Resolver, Query, Mutation, Args, Int, ObjectType, Field } from '@nestjs/graphql';
import { DesktopService } from './desktop.service';
import { Desktop } from './entities/desktop.entity';
import { CreateDesktopInput } from './dto/create-desktop.input';
import { UpdateDesktopInput } from './dto/update-desktop.input';

@ObjectType()
export class DesktopStats {
  @Field(() => Int)
  totalDesktops: number;

  @Field(() => Int)
  totalNotes: number;

  @Field(() => [Desktop])
  desktops: Desktop[];
}

@Resolver(() => Desktop)
export class DesktopResolver {
  constructor(private readonly desktopService: DesktopService) {}

  @Mutation(() => Desktop)
  async createDesktop(
    @Args('createDesktopInput') createDesktopInput: CreateDesktopInput,
    @Args('userId', { type: () => Int }) userId: number
  ) {
    return this.desktopService.create(createDesktopInput, userId);
  }

  @Query(() => [Desktop], { name: 'desktops' })
  async getDesktops(
    @Args('userId', { type: () => Int }) userId: number
  ) {
    return this.desktopService.findAll(userId);
  }

  @Query(() => Desktop, { name: 'desktop' })
  async getDesktop(
    @Args('desktopId', { type: () => Int }) desktopId: number,
    @Args('userId', { type: () => Int }) userId: number
  ) {
    return this.desktopService.findOne(desktopId, userId);
  }

  @Mutation(() => Desktop)
  async updateDesktop(
    @Args('desktopId', { type: () => Int }) desktopId: number,
    @Args('updateDesktopInput') updateDesktopInput: UpdateDesktopInput,
    @Args('userId', { type: () => Int }) userId: number
  ) {
    return this.desktopService.update(desktopId, updateDesktopInput, userId);
  }

  @Mutation(() => String)
  async deleteDesktop(
    @Args('desktopId', { type: () => Int }) desktopId: number,
    @Args('userId', { type: () => Int }) userId: number
  ) {
    const result = await this.desktopService.remove(desktopId, userId);
    return result.message;
  }

  @Query(() => DesktopStats, { name: 'desktopStats' })
  async getDesktopStats(
    @Args('userId', { type: () => Int }) userId: number
  ) {
    return this.desktopService.getDesktopStats(userId);
  }
} 