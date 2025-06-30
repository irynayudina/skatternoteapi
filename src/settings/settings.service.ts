import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async getUserSettings(userId: number) {
    const settings = await this.prisma.userSettings.findUnique({
      where: { userId },
    });

    if (!settings) {
      // Create default settings if they don't exist
      return await this.prisma.userSettings.create({
        data: {
          userId,
          preferredTheme: 'coldarkCold',
          desktopBackground: null, // Default to no background
        },
      });
    }

    return settings;
  }

  async updateUserSettings(userId: number, updateSettingsDto: UpdateSettingsDto) {
    const existingSettings = await this.prisma.userSettings.findUnique({
      where: { userId },
    });

    if (!existingSettings) {
      // Create new settings if they don't exist
      return await this.prisma.userSettings.create({
        data: {
          userId,
          ...updateSettingsDto,
        },
      });
    }

    // Update existing settings
    return await this.prisma.userSettings.update({
      where: { userId },
      data: updateSettingsDto,
    });
  }

  async getPreferredTheme(userId: number): Promise<string> {
    const settings = await this.getUserSettings(userId);
    return settings.preferredTheme;
  }

  async getDesktopBackground(userId: number): Promise<string | null> {
    const settings = await this.getUserSettings(userId);
    return settings.desktopBackground;
  }
} 