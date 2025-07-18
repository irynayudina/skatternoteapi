import { Module } from '@nestjs/common';
import { RoadmapService } from './roadmap.service';
import { RoadmapController } from './roadmap.controller';
import { RoadmapResolver } from './roadmap.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RoadmapController],
  providers: [RoadmapService, RoadmapResolver],
  exports: [RoadmapService],
})
export class RoadmapModule {} 