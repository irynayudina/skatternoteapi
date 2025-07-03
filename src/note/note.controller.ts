import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('note')
@UsePipes(new ValidationPipe())
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto, @Query('userId', ParseIntPipe) userId: number) {
    const note = await this.noteService.create(createNoteDto, userId);
    return {
      message: 'Note created successfully',
      data: note
    };
  }

  @Get()
  async findAll(
    @Query('userId', ParseIntPipe) userId: number,
    @Query('desktopId') desktopId?: string,
    @Query('search') search?: string
  ) {
    const desktopIdNum = desktopId ? parseInt(desktopId) : undefined;
    const notes = await this.noteService.findAll(userId, desktopIdNum, search);
    return {
      message: 'Notes fetched successfully',
      data: notes
    };
  }

  @Get('search')
  async searchNotes(@Query('userId', ParseIntPipe) userId: number, @Query('q') query: string) {
    const notes = await this.noteService.searchNotes(userId, query);
    return {
      message: 'Search completed successfully',
      data: notes
    };
  }

  @Get('tag/:tagName')
  async getNotesByTag(
    @Query('userId', ParseIntPipe) userId: number,
    @Param('tagName') tagName: string
  ) {
    const notes = await this.noteService.getNotesByTag(userId, tagName);
    return {
      message: `Notes with tag "${tagName}" fetched successfully`,
      data: notes
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Query('userId', ParseIntPipe) userId: number) {
    const note = await this.noteService.findOne(id, userId);
    return {
      message: 'Note fetched successfully',
      data: note
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNoteDto: UpdateNoteDto,
    @Query('userId', ParseIntPipe) userId: number
  ) {
    const note = await this.noteService.update(id, updateNoteDto, userId);
    return {
      message: 'Note updated successfully',
      data: note
    };
  }

  @Patch(':id/pin')
  async togglePin(@Param('id', ParseIntPipe) id: number, @Query('userId', ParseIntPipe) userId: number) {
    const note = await this.noteService.togglePin(id, userId);
    return {
      message: 'Note pin status toggled successfully',
      data: note
    };
  }

  @Patch(':id/transfer')
  async transferNote(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { targetDesktopId: number },
    @Query('userId', ParseIntPipe) userId: number
  ) {
    const note = await this.noteService.transferNote(id, body.targetDesktopId, userId);
    return {
      message: 'Note transferred successfully',
      data: note
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Query('userId', ParseIntPipe) userId: number) {
    const result = await this.noteService.remove(id, userId);
    return result;
  }
}
