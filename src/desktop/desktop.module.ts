import { Module } from '@nestjs/common';
import { DesktopService } from './desktop.service';
import { DesktopController } from './desktop.controller';
import { DesktopResolver } from './desktop.resolver';

@Module({
  controllers: [DesktopController],
  providers: [DesktopService, DesktopResolver],
  exports: [DesktopService],
})
export class DesktopModule {}
