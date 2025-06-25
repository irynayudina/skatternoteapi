import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  async create(createNoteDto: CreateNoteDto, userId: number) {
    const { tags, ...noteData } = createNoteDto;

    // Verify desktop belongs to user
    const desktop = await this.prisma.desktop.findFirst({
      where: {
        id: noteData.desktopId,
        userId
      }
    });

    if (!desktop) {
      throw new NotFoundException('Desktop not found');
    }

    // Create note with tags
    const note = await this.prisma.note.create({
      data: {
        ...noteData,
        userId,
        tags: tags && tags.length > 0 ? {
          create: tags.map(tagName => ({
            tag: {
              connectOrCreate: {
                where: { name: tagName },
                create: { name: tagName }
              }
            }
          }))
        } : undefined
      },
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      }
    });

    return note;
  }

  async findAll(userId: number, desktopId?: number, search?: string) {
    const where: any = { userId };
    
    if (desktopId) {
      where.desktopId = desktopId;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        {
          tags: {
            some: {
              tag: {
                name: { contains: search, mode: 'insensitive' }
              }
            }
          }
        }
      ];
    }

    return this.prisma.note.findMany({
      where,
      include: {
        tags: {
          include: {
            tag: true
          }
        },
        desktop: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: [
        { isPinned: 'desc' },
        { updatedAt: 'desc' }
      ]
    });
  }

  async findOne(id: number, userId: number) {
    const note = await this.prisma.note.findFirst({
      where: {
        id,
        userId
      },
      include: {
        tags: {
          include: {
            tag: true
          }
        },
        desktop: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto, userId: number) {
    // Check if note exists and belongs to user
    const existingNote = await this.prisma.note.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!existingNote) {
      throw new NotFoundException('Note not found');
    }

    const { tags, ...noteData } = updateNoteDto;

    // Update note with tags
    const note = await this.prisma.note.update({
      where: { id },
      data: {
        ...noteData,
        tags: tags ? {
          deleteMany: {},
          create: tags.map(tagName => ({
            tag: {
              connectOrCreate: {
                where: { name: tagName },
                create: { name: tagName }
              }
            }
          }))
        } : undefined
      },
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      }
    });

    return note;
  }

  async remove(id: number, userId: number) {
    // Check if note exists and belongs to user
    const existingNote = await this.prisma.note.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!existingNote) {
      throw new NotFoundException('Note not found');
    }

    await this.prisma.note.delete({
      where: { id }
    });

    return { message: 'Note deleted successfully' };
  }

  async togglePin(id: number, userId: number) {
    const note = await this.prisma.note.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    const updatedNote = await this.prisma.note.update({
      where: { id },
      data: {
        isPinned: !note.isPinned
      },
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      }
    });

    return updatedNote;
  }

  async searchNotes(userId: number, query: string) {
    return this.prisma.note.findMany({
      where: {
        userId,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } },
          {
            tags: {
              some: {
                tag: {
                  name: { contains: query, mode: 'insensitive' }
                }
              }
            }
          }
        ]
      },
      include: {
        tags: {
          include: {
            tag: true
          }
        },
        desktop: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: [
        { isPinned: 'desc' },
        { updatedAt: 'desc' }
      ]
    });
  }

  async getNotesByTag(userId: number, tagName: string) {
    return this.prisma.note.findMany({
      where: {
        userId,
        tags: {
          some: {
            tag: {
              name: { equals: tagName, mode: 'insensitive' }
            }
          }
        }
      },
      include: {
        tags: {
          include: {
            tag: true
          }
        },
        desktop: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: [
        { isPinned: 'desc' },
        { updatedAt: 'desc' }
      ]
    });
  }
}
