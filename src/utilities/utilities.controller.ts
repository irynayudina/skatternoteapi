import { Controller, Get, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { UtilitiesService } from './utilities.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('utilities')
export class UtilitiesController {
  constructor(private readonly utilitiesService: UtilitiesService) {}

  @Get('outlet')
  async getUtilities() {
    try {
      const utilities = await this.utilitiesService.findAll();
      // Return the array directly as per specification
      return utilities;
    } catch (error) {
      // If it's already an HttpException, re-throw it
      if (error instanceof HttpException) {
        throw error;
      }
      // Otherwise, wrap it in a 500 error
      throw new HttpException(
        'Failed to fetch utilities',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

