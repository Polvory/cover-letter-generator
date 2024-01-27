import { Module } from '@nestjs/common';
import { OpenAiModule } from './open-ai/open-ai.module';
import {TelgramBotModule} from './bot/telegram.module'
import {DbModule} from './db/db.module'

@Module({
  imports: [OpenAiModule,TelgramBotModule, DbModule],
})
export class AppModule {}
