
import { Update, Start, Hears } from "nestjs-telegraf";
import { Injectable } from "@nestjs/common";
import { Context, Scenes } from 'telegraf';
import { ARCHIEVEMENTS, SETTINGS, start_text } from './constants'
import { UsersService } from "../users/users.service";
import { CreateUser } from "../users/dto/create.dto";
import { Users } from "../users/users.model";
import { ButtonsStart, Buttons } from "./buttons";



@Update()
@Injectable()
export class SceneStart {
  constructor(
    private usersService: UsersService
  ) { }
  @Start()
  async startCommand(ctx: Context) {
    try {
      const user: any = ctx.message.from
      const pauloud: CreateUser = {
        user_id: String(user.id),
        user_name: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
      }
      await this.usersService.create(pauloud)
      await ctx.sendMessage(`${start_text}`, {
        reply_markup: {
          keyboard: ButtonsStart,
          resize_keyboard: true
        },
      })
    } catch (error) {
      await ctx.reply(`Ошибка`)
    }
  }
  

  @Hears('/settings')
  async settingsEnter(ctx: Scenes.SceneContext) {
    ctx.scene.enter(SETTINGS)
  }
  @Hears('/achievements')
  async achievementsEnter(ctx: Scenes.SceneContext) {
    ctx.scene.enter(ARCHIEVEMENTS)
  }

  @Hears('/profile')
  async getProfile(ctx: Scenes.SceneContext) {
    const id: any = ctx.update
    const user: Users | any = await this.usersService.getByTgId(String(id.message.from.id))
    if (!user)
      ctx.sendMessage(`Opps`)
    ctx.sendMessage(`Имя:\n${user.name_to_generate}\n` + `Достижения\n${user.achievements}`)
  }

  @Hears(Buttons.btn_3)
  async getBtnProfile(ctx: Scenes.SceneContext) {
    const id: any = ctx.update
    const user: Users | any = await this.usersService.getByTgId(String(id.message.from.id))
    if (!user)
      ctx.sendMessage(`Opps`)
    ctx.sendMessage(`Имя:\n${user.name_to_generate}\n\n` + `Достижения:\n${user.achievements}`)
  }

  @Hears('/bot')
  async botEnter(ctx: Scenes.SceneContext) {
    ctx.scene.enter('chat')
  }


  @Hears(Buttons.openAi)
  async botBtnEnter(ctx: Scenes.SceneContext) {
    ctx.scene.enter('chat')
  }

  @Hears(Buttons.btn_1)
  async settingsBtnEnter(ctx: Scenes.SceneContext) {
    ctx.scene.enter(SETTINGS)
  }
  @Hears(Buttons.btn_2)
  async settingsBtnAchievements(ctx: Scenes.SceneContext) {
    ctx.scene.enter(ARCHIEVEMENTS)
  }

  async GoBack(ctx: Scenes.WizardContext ){
    ctx.reply(`Ты вышел`, {
      reply_markup: {
        keyboard: ButtonsStart,
        resize_keyboard: true
      },
    }).catch((err) => {
      console.log('Ooops', err)
      return false
    })
    ctx.scene.leave()
  }
}


