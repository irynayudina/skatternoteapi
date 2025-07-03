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
  async create(
    @Body() createRoadmapDto: CreateRoadmapDto,
    @Query('userId') userId: string,
    @Query('desktopId') desktopId: string,
  ) {
    const roadmap = await this.roadmapService.createRoadmap(
      createRoadmapDto,
      parseInt(userId),
      parseInt(desktopId),
    );
    return {
      message: 'Roadmap created successfully',
      data: roadmap
    };
  }

  @Get()
  async findAll(@Query('userId') userId: string, @Query('desktopId') desktopId?: string) {
    const roadmaps = await this.roadmapService.getRoadmaps(
      parseInt(userId),
      desktopId ? parseInt(desktopId) : undefined,
    );
    return {
      message: 'Roadmaps fetched successfully',
      data: roadmaps
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('userId') userId: string) {
    const roadmap = await this.roadmapService.getRoadmap(parseInt(id), parseInt(userId));
    return {
      message: 'Roadmap fetched successfully',
      data: roadmap
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoadmapDto: UpdateRoadmapDto,
    @Query('userId') userId: string,
  ) {
    const roadmap = await this.roadmapService.updateRoadmap(parseInt(id), updateRoadmapDto, parseInt(userId));
    return {
      message: 'Roadmap updated successfully',
      data: roadmap
    };
  }

  @Patch(':id/transfer')
  async transferRoadmap(
    @Param('id') id: string,
    @Body() body: { targetDesktopId: number },
    @Query('userId') userId: string,
  ) {
    const roadmap = await this.roadmapService.transferRoadmap(parseInt(id), body.targetDesktopId, parseInt(userId));
    return {
      message: 'Roadmap transferred successfully',
      data: roadmap
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('userId') userId: string) {
    const result = await this.roadmapService.deleteRoadmap(parseInt(id), parseInt(userId));
    return result;
  }

  @Patch('step/:stepId')
  async updateStep(
    @Param('stepId') stepId: string,
    @Body() updateStepDto: UpdateRoadmapStepDto,
    @Query('userId') userId: string,
  ) {
    const roadmap = await this.roadmapService.updateRoadmapStep(parseInt(stepId), updateStepDto, parseInt(userId));
    return {
      message: 'Roadmap step updated successfully',
      data: roadmap
    };
  }

  @Patch('step/:stepId/toggle')
  async toggleStepCompletion(
    @Param('stepId') stepId: string,
    @Query('userId') userId: string,
  ) {
    const roadmap = await this.roadmapService.toggleStepCompletion(parseInt(stepId), parseInt(userId));
    return {
      message: 'Step completion toggled successfully',
      data: roadmap
    };
  }

  @Patch(':id/reorder')
  async reorderSteps(
    @Param('id') id: string,
    @Body() body: { stepIds: number[] },
    @Query('userId') userId: string,
  ) {
    const roadmap = await this.roadmapService.reorderSteps(parseInt(id), body.stepIds, parseInt(userId));
    return {
      message: 'Steps reordered successfully',
      data: roadmap
    };
  }
} 