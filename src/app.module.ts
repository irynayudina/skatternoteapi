import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { NoteController } from './note/note.controller';
import { DesktopController } from './desktop/desktop.controller';
import { TagController } from './tag/tag.controller';
import { TagService } from './tag/tag.service';
import { NoteService } from './note/note.service';
import { DesktopService } from './desktop/desktop.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { NoteModule } from './note/note.module';
import { TagModule } from './tag/tag.module';
import { DesktopModule } from './desktop/desktop.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UserModule, 
    NoteModule, 
    TagModule, 
    DesktopModule,
    AuthModule
  ],
  controllers: [AppController, UserController, NoteController, DesktopController, TagController],
  providers: [AppService, TagService, NoteService, DesktopService, UserService],
})
export class AppModule {}
