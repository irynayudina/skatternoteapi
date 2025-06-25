import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto) {
    const { name, color } = createTagDto;

    // Check if tag already exists
    const existingTag = await this.prisma.tag.findUnique({
      where: { name }
    });

    if (existingTag) {
      throw new ConflictException('Tag with this name already exists');
    }

    const tag = await this.prisma.tag.create({
      data: {
        name,
        color
      }
    });

    return tag;
  }

  async findAll() {
    return this.prisma.tag.findMany({
      include: {
        _count: {
          select: {
            notes: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });
  }

  async findOne(id: number) {
    const tag = await this.prisma.tag.findUnique({
      where: { id },
      include: {
        notes: {
          include: {
            note: {
              select: {
                id: true,
                title: true,
                content: true,
                isPinned: true,
                createdAt: true,
                updatedAt: true,
                desktop: {
                  select: {
                    id: true,
                    name: true
                  }
                }
              }
            }
          }
        },
        _count: {
          select: {
            notes: true
          }
        }
      }
    });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    return tag;
  }

  async findByName(name: string) {
    return this.prisma.tag.findUnique({
      where: { name }
    });
  }

  async update(id: number, updateTagDto: Partial<CreateTagDto>) {
    const existingTag = await this.prisma.tag.findUnique({
      where: { id }
    });

    if (!existingTag) {
      throw new NotFoundException('Tag not found');
    }

    // Check if new name conflicts with existing tag
    if (updateTagDto.name && updateTagDto.name !== existingTag.name) {
      const nameConflict = await this.prisma.tag.findUnique({
        where: { name: updateTagDto.name }
      });

      if (nameConflict) {
        throw new ConflictException('Tag with this name already exists');
      }
    }

    const tag = await this.prisma.tag.update({
      where: { id },
      data: updateTagDto
    });

    return tag;
  }

  async remove(id: number) {
    const existingTag = await this.prisma.tag.findUnique({
      where: { id }
    });

    if (!existingTag) {
      throw new NotFoundException('Tag not found');
    }

    await this.prisma.tag.delete({
      where: { id }
    });

    return { message: 'Tag deleted successfully' };
  }

  async getPopularTags(limit: number = 10) {
    return this.prisma.tag.findMany({
      include: {
        _count: {
          select: {
            notes: true
          }
        }
      },
      orderBy: {
        notes: {
          _count: 'desc'
        }
      },
      take: limit
    });
  }

  async getTagsByUser(userId: number) {
    return this.prisma.tag.findMany({
      where: {
        notes: {
          some: {
            note: {
              userId
            }
          }
        }
      },
      include: {
        _count: {
          select: {
            notes: {
              where: {
                note: {
                  userId
                }
              }
            }
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });
  }

  async searchTags(query: string) {
    return this.prisma.tag.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive'
        }
      },
      include: {
        _count: {
          select: {
            notes: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });
  }
}
