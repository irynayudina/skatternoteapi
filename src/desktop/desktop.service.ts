import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDesktopDto } from './dto/create-desktop.dto';
import { UpdateDesktopDto } from './dto/update-desktop.dto';

@Injectable()
export class DesktopService {
  constructor(private prisma: PrismaService) {}

  async create(createDesktopDto: CreateDesktopDto, userId: number) {
    const desktop = await this.prisma.desktop.create({
      data: {
        ...createDesktopDto,
        userId
      },
      include: {
        notes: {
          select: {
            id: true,
            title: true,
            isPinned: true,
            createdAt: true
          }
        }
      }
    });

    return desktop;
  }

  async findAll(userId: number) {
    return this.prisma.desktop.findMany({
      where: { userId },
      include: {
        notes: {
          select: {
            id: true,
            title: true,
            isPinned: true,
            createdAt: true
          }
        },
        _count: {
          select: {
            notes: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findOne(id: number, userId: number) {
    const desktop = await this.prisma.desktop.findFirst({
      where: {
        id,
        userId
      },
      include: {
        notes: {
          include: {
            tags: {
              include: {
                tag: true
              }
            }
          },
          orderBy: [
            { isPinned: 'desc' },
            { updatedAt: 'desc' }
          ]
        }
      }
    });

    if (!desktop) {
      throw new NotFoundException('Desktop not found');
    }

    return desktop;
  }

  async update(id: number, updateDesktopDto: UpdateDesktopDto, userId: number) {
    // Check if desktop exists and belongs to user
    const existingDesktop = await this.prisma.desktop.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!existingDesktop) {
      throw new NotFoundException('Desktop not found');
    }

    const desktop = await this.prisma.desktop.update({
      where: { id },
      data: updateDesktopDto,
      include: {
        notes: {
          select: {
            id: true,
            title: true,
            isPinned: true,
            createdAt: true
          }
        }
      }
    });

    return desktop;
  }

  async remove(id: number, userId: number) {
    // Check if desktop exists and belongs to user
    const existingDesktop = await this.prisma.desktop.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!existingDesktop) {
      throw new NotFoundException('Desktop not found');
    }

    await this.prisma.desktop.delete({
      where: { id }
    });

    return { message: 'Desktop deleted successfully' };
  }

  async getDesktopStats(userId: number) {
    const desktops = await this.prisma.desktop.findMany({
      where: { userId },
      include: {
        _count: {
          select: {
            notes: true
          }
        }
      }
    });

    const totalNotes = desktops.reduce((sum, desktop) => sum + desktop._count.notes, 0);
    const totalDesktops = desktops.length;

    return {
      totalDesktops,
      totalNotes,
      desktops
    };
  }
}
