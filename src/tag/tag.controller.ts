import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tag')
@UsePipes(new ValidationPipe())
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async create(@Body() createTagDto: CreateTagDto) {
    const tag = await this.tagService.create(createTagDto);
    return {
      message: 'Tag created successfully',
      data: tag
    };
  }

  @Get()
  async findAll() {
    const tags = await this.tagService.findAll();
    return {
      message: 'Tags fetched successfully',
      data: tags
    };
  }

  @Get('popular')
  async getPopularTags(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit) : 10;
    const tags = await this.tagService.getPopularTags(limitNum);
    return {
      message: 'Popular tags fetched successfully',
      data: tags
    };
  }

  @Get('user/:userId')
  async getTagsByUser(@Param('userId', ParseIntPipe) userId: number) {
    const tags = await this.tagService.getTagsByUser(userId);
    return {
      message: 'User tags fetched successfully',
      data: tags
    };
  }

  @Get('search')
  async searchTags(@Query('q') query: string) {
    const tags = await this.tagService.searchTags(query);
    return {
      message: 'Tag search completed successfully',
      data: tags
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const tag = await this.tagService.findOne(id);
    return {
      message: 'Tag fetched successfully',
      data: tag
    };
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateTagDto: Partial<CreateTagDto>) {
    const tag = await this.tagService.update(id, updateTagDto);
    return {
      message: 'Tag updated successfully',
      data: tag
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.tagService.remove(id);
    return result;
  }
}
