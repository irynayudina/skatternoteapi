import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { NoteResolver } from './note.resolver';

@Module({
  controllers: [NoteController],
  providers: [NoteService, NoteResolver],
  exports: [NoteService],
})
export class NoteModule {}
