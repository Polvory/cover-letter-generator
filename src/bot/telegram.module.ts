import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { session } from 'telegraf';
import { SceneStart } from './scene_start.service';
import {ChatWizard} from './scene_chat_gpt.service'
import { UsersModule } from '../users/users.module';
import { SettingsWizard } from './scene_settings_name.service';
import { AchievementsWizard } from './scene_settings_achievements.service';
import { getBotConfig } from '../config/Bot.config'
import { OpenAiModule } from '../open-ai/open-ai.module';

@Module({
    imports: [
      UsersModule,
      OpenAiModule,
      TelegrafModule.forRoot({
        token: getBotConfig().token,
        middlewares: [session()],
      }),
    ],
    providers: [SceneStart, ChatWizard, SettingsWizard, AchievementsWizard],
  })
  export class TelgramBotModule { }