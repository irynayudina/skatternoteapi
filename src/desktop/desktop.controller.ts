import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { DesktopService } from './desktop.service';
import { CreateDesktopDto } from './dto/create-desktop.dto';
import { UpdateDesktopDto } from './dto/update-desktop.dto';

@Controller('desktop')
@UsePipes(new ValidationPipe())
export class DesktopController {
  constructor(private readonly desktopService: DesktopService) {}

  @Post()
  async create(@Body() createDesktopDto: CreateDesktopDto, @Query('userId', ParseIntPipe) userId: number) {
    const desktop = await this.desktopService.create(createDesktopDto, userId);
    return {
      message: 'Desktop created successfully',
      data: desktop
    };
  }

  @Get()
  async findAll(@Query('userId', ParseIntPipe) userId: number) {
    const desktops = await this.desktopService.findAll(userId);
    return {
      message: 'Desktops fetched successfully',
      data: desktops
    };
  }

  @Get('stats')
  async getStats(@Query('userId', ParseIntPipe) userId: number) {
    const stats = await this.desktopService.getDesktopStats(userId);
    return {
      message: 'Desktop stats fetched successfully',
      data: stats
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Query('userId', ParseIntPipe) userId: number) {
    const desktop = await this.desktopService.findOne(id, userId);
    return {
      message: 'Desktop fetched successfully',
      data: desktop
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDesktopDto: UpdateDesktopDto,
    @Query('userId', ParseIntPipe) userId: number
  ) {
    const desktop = await this.desktopService.update(id, updateDesktopDto, userId);
    return {
      message: 'Desktop updated successfully',
      data: desktop
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Query('userId', ParseIntPipe) userId: number) {
    const result = await this.desktopService.remove(id, userId);
    return result;
  }
}
