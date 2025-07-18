import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SettingsService } from './settings.service';
import { UserSettings } from './entities/user-settings.entity';
import { UpdateSettingsInput } from './dto/update-settings.input';

@Resolver(() => UserSettings)
export class SettingsResolver {
  constructor(private readonly settingsService: SettingsService) {}

  @Query(() => UserSettings, { name: 'userSettings' })
  async getUserSettings(@Args('userId', { type: () => Int }) userId: number) {
    return this.settingsService.getUserSettings(userId);
  }

  @Mutation(() => UserSettings)
  async updateUserSettings(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('updateSettingsInput') updateSettingsInput: UpdateSettingsInput,
  ) {
    return this.settingsService.updateUserSettings(userId, updateSettingsInput);
  }

  @Query(() => String, { name: 'preferredTheme' })
  async getPreferredTheme(@Args('userId', { type: () => Int }) userId: number) {
    return this.settingsService.getPreferredTheme(userId);
  }

  @Query(() => String, { name: 'desktopBackground', nullable: true })
  async getDesktopBackground(@Args('userId', { type: () => Int }) userId: number) {
    return this.settingsService.getDesktopBackground(userId);
  }
} 