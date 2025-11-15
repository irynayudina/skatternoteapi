import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UtilityResponse } from './dto/utility-response.dto';

@Injectable()
export class UtilitiesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<UtilityResponse[]> {
    try {
      // Fetch all active utilities, ordered by orderIndex
      const utilities = await this.prisma.utility.findMany({
        where: {
          isActive: true,
        },
        orderBy: {
          orderIndex: 'asc',
        },
        select: {
          id: true,
          name: true,
          link: true,
          icon: true,
          picture: true,
          image: true,
          description: true,
        },
      });

      // Return utilities array directly (as per spec)
      return utilities;
    } catch (error) {
      console.error('Error fetching utilities:', error);
      throw new HttpException(
        'Failed to fetch utilities',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

