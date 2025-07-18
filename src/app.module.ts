import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { NoteController } from './note/note.controller';
import { DesktopController } from './desktop/desktop.controller';
import { TagController } from './tag/tag.controller';
import { SettingsController } from './settings/settings.controller';
import { RoadmapController } from './roadmap/roadmap.controller';
import { TagService } from './tag/tag.service';
import { NoteService } from './note/note.service';
import { DesktopService } from './desktop/desktop.service';
import { UserService } from './user/user.service';
import { RoadmapService } from './roadmap/roadmap.service';
import { UserModule } from './user/user.module';
import { NoteModule } from './note/note.module';
import { TagModule } from './tag/tag.module';
import { DesktopModule } from './desktop/desktop.module';
import { SettingsModule } from './settings/settings.module';
import { RoadmapModule } from './roadmap/roadmap.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      graphiql: true,
    }),
    PrismaModule,
    UserModule, 
    NoteModule, 
    TagModule, 
    DesktopModule,
    SettingsModule,
    RoadmapModule,
    AuthModule
  ],
  controllers: [AppController, UserController, NoteController, DesktopController, TagController, SettingsController, RoadmapController],
  providers: [AppService, TagService, NoteService, DesktopService, UserService, RoadmapService],
})
export class AppModule {}
