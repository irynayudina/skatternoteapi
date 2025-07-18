import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NoteService } from './note.service';
import { Note } from './entities/note.entity';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';

@Resolver(() => Note)
export class NoteResolver {
  constructor(private readonly noteService: NoteService) {}

  @Mutation(() => Note)
  async createNote(
    @Args('createNoteInput') createNoteInput: CreateNoteInput,
    @Args('userId', { type: () => Int }) userId: number
  ) {
    return this.noteService.create(createNoteInput, userId);
  }

  @Query(() => [Note], { name: 'notes' })
  async findAll(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('desktopId', { type: () => Int, nullable: true }) desktopId?: number,
    @Args('search', { nullable: true }) search?: string
  ) {
    return this.noteService.findAll(userId, desktopId, search);
  }

  @Query(() => Note, { name: 'note' })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
    @Args('userId', { type: () => Int }) userId: number
  ) {
    return this.noteService.findOne(id, userId);
  }

  @Query(() => [Note], { name: 'searchNotes' })
  async searchNotes(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('query') query: string
  ) {
    return this.noteService.searchNotes(userId, query);
  }

  @Query(() => [Note], { name: 'notesByTag' })
  async getNotesByTag(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('tagName') tagName: string
  ) {
    return this.noteService.getNotesByTag(userId, tagName);
  }

  @Mutation(() => Note)
  async updateNote(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateNoteInput') updateNoteInput: UpdateNoteInput,
    @Args('userId', { type: () => Int }) userId: number
  ) {
    return this.noteService.update(id, updateNoteInput, userId);
  }

  @Mutation(() => Note)
  async toggleNotePin(
    @Args('id', { type: () => Int }) id: number,
    @Args('userId', { type: () => Int }) userId: number
  ) {
    return this.noteService.togglePin(id, userId);
  }

  @Mutation(() => Note)
  async transferNote(
    @Args('id', { type: () => Int }) id: number,
    @Args('targetDesktopId', { type: () => Int }) targetDesktopId: number,
    @Args('userId', { type: () => Int }) userId: number
  ) {
    return this.noteService.transferNote(id, targetDesktopId, userId);
  }

  @Mutation(() => String)
  async removeNote(
    @Args('id', { type: () => Int }) id: number,
    @Args('userId', { type: () => Int }) userId: number
  ) {
    const result = await this.noteService.remove(id, userId);
    return result.message;
  }
} 