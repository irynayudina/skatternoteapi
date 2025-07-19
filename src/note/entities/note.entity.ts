import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Tag } from '../../tag/entities/tag.entity';
import { Desktop } from '../../desktop/entities/desktop.entity';

@ObjectType()
export class NoteTag {
  @Field(() => Int)
  id: number;

  @Field(() => Tag)
  tag: Tag;
}

@ObjectType()
export class Note {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  isPinned: boolean;

  @Field(() => Int)
  desktopId: number;

  @Field(() => Int)
  userId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Desktop, { nullable: true })
  desktop?: Desktop;

  @Field(() => [NoteTag], { nullable: true })
  tags?: NoteTag[];
} 