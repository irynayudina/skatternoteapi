import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { UpdateRoadmapDto } from './dto/update-roadmap.dto';
import { UpdateRoadmapStepDto } from './dto/update-roadmap-step.dto';
import { CreateRoadmapInput } from './dto/create-roadmap.input';
import { UpdateRoadmapInput } from './dto/update-roadmap.input';

@Injectable()
export class RoadmapService {
  constructor(private prisma: PrismaService) {}

  async createRoadmap(createRoadmapDto: CreateRoadmapDto | CreateRoadmapInput, userId: number, desktopId: number) {
    const { steps, ...roadmapData } = createRoadmapDto;

    // Verify desktop belongs to user
    const desktop = await this.prisma.desktop.findFirst({
      where: { id: desktopId, userId },
    });

    if (!desktop) {
      throw new ForbiddenException('Desktop not found or access denied');
    }

    return this.prisma.roadmap.create({
      data: {
        ...roadmapData,
        userId,
        desktopId,
        steps: {
          create: steps.map((step, index) => ({
            ...step,
            order: step.order || index + 1,
          })),
        },
      },
      include: {
        steps: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async getRoadmaps(userId: number, desktopId?: number) {
    const where: any = { userId };
    if (desktopId) {
      where.desktopId = desktopId;
    }

    return this.prisma.roadmap.findMany({
      where,
      include: {
        steps: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getRoadmap(roadmapId: number, userId: number) {
    const roadmap = await this.prisma.roadmap.findFirst({
      where: { id: roadmapId, userId },
      include: {
        steps: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!roadmap) {
      throw new NotFoundException('Roadmap not found');
    }

    return roadmap;
  }

  async updateRoadmap(roadmapId: number, updateRoadmapDto: UpdateRoadmapDto | UpdateRoadmapInput, userId: number) {
    const roadmap = await this.prisma.roadmap.findFirst({
      where: { id: roadmapId, userId },
    });

    if (!roadmap) {
      throw new NotFoundException('Roadmap not found');
    }

    const { steps, ...roadmapData } = updateRoadmapDto;

    // If steps are provided, update them
    if (steps) {
      // Delete existing steps
      await this.prisma.roadmapStep.deleteMany({
        where: { roadmapId },
      });

      // Create new steps
      await this.prisma.roadmapStep.createMany({
        data: steps.map((step, index) => ({
          ...step,
          roadmapId,
          order: step.order || index + 1,
        })),
      });
    }

    return this.prisma.roadmap.update({
      where: { id: roadmapId },
      data: roadmapData,
      include: {
        steps: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async deleteRoadmap(roadmapId: number, userId: number) {
    const roadmap = await this.prisma.roadmap.findFirst({
      where: { id: roadmapId, userId },
    });

    if (!roadmap) {
      throw new NotFoundException('Roadmap not found');
    }

    await this.prisma.roadmap.delete({
      where: { id: roadmapId },
    });

    return { message: 'Roadmap deleted successfully' };
  }

  async updateRoadmapStep(stepId: number, updateStepDto: UpdateRoadmapStepDto, userId: number) {
    const step = await this.prisma.roadmapStep.findFirst({
      where: {
        id: stepId,
        roadmap: { userId },
      },
      include: { roadmap: true },
    });

    if (!step) {
      throw new NotFoundException('Roadmap step not found');
    }

    return this.prisma.roadmapStep.update({
      where: { id: stepId },
      data: updateStepDto,
      include: {
        roadmap: {
          include: {
            steps: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });
  }

  async toggleStepCompletion(stepId: number, userId: number) {
    const step = await this.prisma.roadmapStep.findFirst({
      where: {
        id: stepId,
        roadmap: { userId },
      },
    });

    if (!step) {
      throw new NotFoundException('Roadmap step not found');
    }

    return this.prisma.roadmapStep.update({
      where: { id: stepId },
      data: { isCompleted: !step.isCompleted },
      include: {
        roadmap: {
          include: {
            steps: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });
  }

  async reorderSteps(roadmapId: number, stepIds: number[], userId: number) {
    const roadmap = await this.prisma.roadmap.findFirst({
      where: { id: roadmapId, userId },
    });

    if (!roadmap) {
      throw new NotFoundException('Roadmap not found');
    }

    // Update the order of each step
    const updates = stepIds.map((stepId, index) =>
      this.prisma.roadmapStep.update({
        where: { id: stepId },
        data: { order: index + 1 },
      })
    );

    await this.prisma.$transaction(updates);

    return this.prisma.roadmap.findUnique({
      where: { id: roadmapId },
      include: {
        steps: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async transferRoadmap(roadmapId: number, targetDesktopId: number, userId: number) {
    // Check if roadmap exists and belongs to user
    const existingRoadmap = await this.prisma.roadmap.findFirst({
      where: {
        id: roadmapId,
        userId
      }
    });

    if (!existingRoadmap) {
      throw new NotFoundException('Roadmap not found');
    }

    // Check if target desktop exists and belongs to user
    const targetDesktop = await this.prisma.desktop.findFirst({
      where: {
        id: targetDesktopId,
        userId
      }
    });

    if (!targetDesktop) {
      throw new NotFoundException('Target desktop not found');
    }

    // Don't transfer if already in the target desktop
    if (existingRoadmap.desktopId === targetDesktopId) {
      throw new ForbiddenException('Roadmap is already in the target desktop');
    }

    // Transfer the roadmap
    const roadmap = await this.prisma.roadmap.update({
      where: { id: roadmapId },
      data: {
        desktopId: targetDesktopId
      },
      include: {
        steps: {
          orderBy: { order: 'asc' },
        },
      },
    });

    return roadmap;
  }
} 