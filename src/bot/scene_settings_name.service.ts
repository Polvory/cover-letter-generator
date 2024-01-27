import { Context, Hears, On, SceneEnter, Wizard} from "nestjs-telegraf";
import { Scenes } from "telegraf";
import { SETTINGS } from './constants'
import { UsersService } from "../users/users.service";
import { Buttons } from "./buttons";
import { SceneStart } from "./scene_start.service";



@Wizard(SETTINGS)
export class SettingsWizard {

  constructor(
    private usersService: UsersService,
    private sceneStart: SceneStart
  ) { }



  @SceneEnter()
  async stepEnter(@Context() ctx: Scenes.WizardContext) {
    const id: any = ctx.update
    console.log(id.message.from.id)

    const user: any = await this.usersService.getByTgId(String(id.message.from.id))

    ctx.sendMessage(`Настроим имя.\nТекушее имя: ${user.name_to_generate}\nОтправь в чат имя на которое меняем \nВернуться - /back`, {
      reply_markup: {
        keyboard: [[Buttons.back]],
        resize_keyboard: true
      },
    })
  }

  @Hears('/back')
  async leave(@Context() ctx: Scenes.WizardContext) {
    this.sceneStart.GoBack(ctx)
  }
  @Hears(Buttons.back)
  async backleave(@Context() ctx: Scenes.WizardContext) {
    this.sceneStart.GoBack(ctx)
  }

  @On('text')
  async onText(@Context() ctx: Scenes.WizardContext) {
    try {
      const message = JSON.parse(JSON.stringify(ctx.message))
      const user: any = ctx.message.from
      const update = await this.usersService.edite_name_to_generate(user.id, message.text)
      if (update) {
        ctx.sendMessage(`Изменили на:\n${message.text}\nВернуться - /back`)
      } else {
        ctx.sendMessage(`Ошибка!`)
      }

    } catch (error) {
      await ctx.sendMessage(`Ошибка!`)
    }
  }



}