import { Context, Hears, On, SceneEnter, Wizard } from "nestjs-telegraf";
import { Scenes } from "telegraf";
import { ARCHIEVEMENTS } from './constants'
import { UsersService } from "../users/users.service";
import { Buttons} from "./buttons";
import { SceneStart } from "./scene_start.service";



@Wizard(ARCHIEVEMENTS)
export class AchievementsWizard {

  constructor(
    private usersService: UsersService,
    private sceneStart: SceneStart
  ) { }

  @SceneEnter()
  async stepEnter(@Context() ctx: Scenes.WizardContext) {
    const id: any = ctx.update
    const user: any = await this.usersService.getByTgId(String(id.message.from.id))
    ctx.sendMessage(`Настроим твой достижения.\nТекушее: ${user.achievements}\nОтправь текст на которой меняем \nВернуться - /back`, {
      reply_markup: {
        keyboard: [[Buttons.back]],
        resize_keyboard: true
      },
    })
  }

  @Hears('Назад')
  async backleave(@Context() ctx: Scenes.WizardContext) {
    this.sceneStart.GoBack(ctx)
  }

  @Hears('/back')
  async leave(@Context() ctx: Scenes.WizardContext) {
    this.sceneStart.GoBack(ctx)
  }

  @On('text')
  async onText(@Context() ctx: Scenes.WizardContext) {
    try {
      const message = JSON.parse(JSON.stringify(ctx.message))
      const user: any = ctx.message.from
      const update = await this.usersService.edite_achievements(user.id, message.text)
      if (update) {
        ctx.sendMessage(`Изменили на:\n${message.text}\nВернуться - /back`, {
          reply_markup: {
            keyboard: [[Buttons.back]],
            resize_keyboard: true
          },
        })
      } else {
        ctx.sendMessage(`Ошибка!`)
      }

    } catch (error) {
      await ctx.sendMessage(`Ошибка!`)
    }
  }



}