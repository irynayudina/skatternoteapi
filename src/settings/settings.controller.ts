import { Controller, Get, Patch, Body, Query, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('settings')
@UseGuards(AuthGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async getUserSettings(@Query('userId') userId: string) {
    const settings = await this.settingsService.getUserSettings(parseInt(userId));
    return {
      message: 'User settings retrieved successfully',
      data: settings,
    };
  }

  @Patch()
  async updateUserSettings(
    @Query('userId') userId: string,
    @Body() updateSettingsDto: UpdateSettingsDto,
  ) {
    const settings = await this.settingsService.updateUserSettings(
      parseInt(userId),
      updateSettingsDto,
    );
    return {
      message: 'User settings updated successfully',
      data: settings,
    };
  }

  @Get('theme')
  async getPreferredTheme(@Query('userId') userId: string) {
    const theme = await this.settingsService.getPreferredTheme(parseInt(userId));
    return {
      message: 'Preferred theme retrieved successfully',
      data: { preferredTheme: theme },
    };
  }

  @Get('background')
  async getDesktopBackground(@Query('userId') userId: string) {
    const background = await this.settingsService.getDesktopBackground(parseInt(userId));
    return {
      message: 'Desktop background retrieved successfully',
      data: { desktopBackground: background },
    };
  }
} 