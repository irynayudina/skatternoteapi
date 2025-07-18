import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoadmapService } from './roadmap.service';
import { Roadmap } from './entities/roadmap.entity';
import { CreateRoadmapInput } from './dto/create-roadmap.input';
import { UpdateRoadmapInput } from './dto/update-roadmap.input';
import { UpdateRoadmapStepDto } from './dto/update-roadmap-step.dto';

@Resolver(() => Roadmap)
export class RoadmapResolver {
  constructor(private readonly roadmapService: RoadmapService) {}

  @Mutation(() => Roadmap)
  async createRoadmap(
    @Args('createRoadmapInput') createRoadmapInput: CreateRoadmapInput,
    @Args('userId', { type: () => Int }) userId: number
  ) {
    return this.roadmapService.createRoadmap(createRoadmapInput, userId, createRoadmapInput.desktopId);
  }

  @Query(() => [Roadmap], { name: 'roadmaps' })
  async getRoadmaps(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('desktopId', { type: () => Int, nullable: true }) desktopId?: number
  ) {
    return this.roadmapService.getRoadmaps(userId, desktopId);
  }

  @Query(() => Roadmap, { name: 'roadmap' })
  async getRoadmap(
    @Args('roadmapId', { type: () => Int }) roadmapId: number,
    @Args('userId', { type: () => Int }) userId: number
  ) {
    return this.roadmapService.getRoadmap(roadmapId, userId);
  }

  @Mutation(() => Roadmap)
  async updateRoadmap(
    @Args('roadmapId', { type: () => Int }) roadmapId: number,
    @Args('updateRoadmapInput') updateRoadmapInput: UpdateRoadmapInput,
    @Args('userId', { type: () => Int }) userId: number
  ) {
    return this.roadmapService.updateRoadmap(roadmapId, updateRoadmapInput, userId);
  }

  @Mutation(() => Roadmap)
  async updateRoadmapStep(
    @Args('stepId', { type: () => Int }) stepId: number,
    @Args('updateStepDto') updateStepDto: UpdateRoadmapStepDto,
    @Args('userId', { type: () => Int }) userId: number
  ) {
    return this.roadmapService.updateRoadmapStep(stepId, updateStepDto, userId);
  }

  @Mutation(() => Roadmap)
  async toggleStepCompletion(
    @Args('stepId', { type: () => Int }) stepId: number,
    @Args('userId', { type: () => Int }) userId: number
  ) {
    return this.roadmapService.toggleStepCompletion(stepId, userId);
  }

  @Mutation(() => Roadmap)
  async reorderSteps(
    @Args('roadmapId', { type: () => Int }) roadmapId: number,
    @Args('stepIds', { type: () => [Int] }) stepIds: number[],
    @Args('userId', { type: () => Int }) userId: number
  ) {
    return this.roadmapService.reorderSteps(roadmapId, stepIds, userId);
  }

  @Mutation(() => Roadmap)
  async transferRoadmap(
    @Args('roadmapId', { type: () => Int }) roadmapId: number,
    @Args('targetDesktopId', { type: () => Int }) targetDesktopId: number,
    @Args('userId', { type: () => Int }) userId: number
  ) {
    return this.roadmapService.transferRoadmap(roadmapId, targetDesktopId, userId);
  }

  @Mutation(() => String)
  async deleteRoadmap(
    @Args('roadmapId', { type: () => Int }) roadmapId: number,
    @Args('userId', { type: () => Int }) userId: number
  ) {
    const result = await this.roadmapService.deleteRoadmap(roadmapId, userId);
    return result.message;
  }
} 