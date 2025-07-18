import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Mutation(() => Tag)
  async createTag(@Args('createTagInput') createTagInput: CreateTagInput) {
    return this.tagService.create(createTagInput);
  }

  @Query(() => [Tag], { name: 'tags' })
  async findAll() {
    return this.tagService.findAll();
  }

  @Query(() => Tag, { name: 'tag' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tagService.findOne(id);
  }

  @Query(() => [Tag], { name: 'popularTags' })
  async getPopularTags(@Args('limit', { type: () => Int, nullable: true }) limit?: number) {
    return this.tagService.getPopularTags(limit);
  }

  @Query(() => [Tag], { name: 'tagsByUser' })
  async getTagsByUser(@Args('userId', { type: () => Int }) userId: number) {
    return this.tagService.getTagsByUser(userId);
  }

  @Query(() => [Tag], { name: 'searchTags' })
  async searchTags(@Args('query') query: string) {
    return this.tagService.searchTags(query);
  }

  @Mutation(() => Tag)
  async updateTag(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateTagInput') updateTagInput: UpdateTagInput,
  ) {
    return this.tagService.update(id, updateTagInput);
  }

  @Mutation(() => String)
  async removeTag(@Args('id', { type: () => Int }) id: number) {
    const result = await this.tagService.remove(id);
    return result.message;
  }
} 