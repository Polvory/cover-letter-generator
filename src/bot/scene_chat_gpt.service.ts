import { Context, Hears, On, SceneEnter, Wizard, WizardStep } from 'nestjs-telegraf'
import { Scenes} from 'telegraf'
import { UsersService } from '../users/users.service';
import { Buttons, ButtonsStart } from './buttons';
import { OpenAiService } from '../open-ai/open-ai.service';
import { SceneStart } from "./scene_start.service";


@Wizard('chat')
export class ChatWizard {

  constructor(
    private usersService: UsersService,
    private openAiService:OpenAiService,
    private sceneStart: SceneStart
    ) { }

  async crateAnswer(text: string, name: string, achievements: string) {
      const qw: string = `Основываясь на моих достижениях:\n`
        + `${achievements}\n`
        + `Напиши мне соправадительное письмо на вакансию ${text}\n добавь мне навыки требуемые в этой вакансии не больше 3 абзацев` +
        `мое имя:${name}\nИспользуй френдли стиль общения.\n` +
        `Не используй слова: успеха, увлекательные, достичь успеха, новые вызовы, нетерпением и.т д\n`
      let answer:string = await this.openAiService.getCompletions(qw)
      return answer
}

  @SceneEnter()
  async stepEnter(@Context() ctx: Scenes.WizardContext) {
    const id: any = ctx.update
    console.log(id.message.from.id)
    ctx.sendMessage(`Пришли в чат сылку на вакансию,` +
      `\n важно ваканися должна быть доступна без регистрации!` +
      `\n/back`, {
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

  isURL(str:string) {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(str);
  }

  @On('text')
  async onText(@Context() ctx: Scenes.WizardContext) {
    try {
      const message = JSON.parse(JSON.stringify(ctx.message))
      console.log(message.text)
      const user_id: any = ctx.message.from
      const user: any = await this.usersService.getByTgId(String(user_id.id))
      if (!user)
        ctx.sendMessage(`Opps`)

      const validate_url = this.isURL(message.text)
      if (!validate_url) {
        ctx.reply(`Это не ссылка, попробуй еще раз`)
      }
      else {
        ctx.reply(`Готовлю ответ`)
        this.crateAnswer(message.text, user.name_to_generate, user.achievements).then((answer) => {
          ctx.sendMessage(`${answer}`)
        });
      }

    } catch (error) {
      await ctx.sendMessage(`Ошибка!`)
    }
  }
}