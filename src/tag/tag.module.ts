import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TagResolver } from './tag.resolver';

@Module({
  controllers: [TagController],
  providers: [TagService, TagResolver],
  exports: [TagService],
})
export class TagModule {}
