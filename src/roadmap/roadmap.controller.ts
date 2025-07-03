import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { RoadmapService } from './roadmap.service';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { UpdateRoadmapDto } from './dto/update-roadmap.dto';
import { UpdateRoadmapStepDto } from './dto/update-roadmap-step.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('roadmap')
@UseGuards(AuthGuard)
export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}

  @Post()
  create(
    @Body() createRoadmapDto: CreateRoadmapDto,
    @Query('userId') userId: string,
    @Query('desktopId') desktopId: string,
  ) {
    return this.roadmapService.createRoadmap(
      createRoadmapDto,
      parseInt(userId),
      parseInt(desktopId),
    );
  }

  @Get()
  findAll(@Query('userId') userId: string, @Query('desktopId') desktopId?: string) {
    return this.roadmapService.getRoadmaps(
      parseInt(userId),
      desktopId ? parseInt(desktopId) : undefined,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('userId') userId: string) {
    return this.roadmapService.getRoadmap(parseInt(id), parseInt(userId));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoadmapDto: UpdateRoadmapDto,
    @Query('userId') userId: string,
  ) {
    return this.roadmapService.updateRoadmap(parseInt(id), updateRoadmapDto, parseInt(userId));
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Query('userId') userId: string) {
    return this.roadmapService.deleteRoadmap(parseInt(id), parseInt(userId));
  }

  @Patch('step/:stepId')
  updateStep(
    @Param('stepId') stepId: string,
    @Body() updateStepDto: UpdateRoadmapStepDto,
    @Query('userId') userId: string,
  ) {
    return this.roadmapService.updateRoadmapStep(parseInt(stepId), updateStepDto, parseInt(userId));
  }

  @Patch('step/:stepId/toggle')
  toggleStepCompletion(
    @Param('stepId') stepId: string,
    @Query('userId') userId: string,
  ) {
    return this.roadmapService.toggleStepCompletion(parseInt(stepId), parseInt(userId));
  }

  @Patch(':id/reorder')
  reorderSteps(
    @Param('id') id: string,
    @Body() body: { stepIds: number[] },
    @Query('userId') userId: string,
  ) {
    return this.roadmapService.reorderSteps(parseInt(id), body.stepIds, parseInt(userId));
  }
} 