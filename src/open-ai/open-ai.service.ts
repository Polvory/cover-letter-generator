import { Injectable } from '@nestjs/common';
import {openai} from "./OpenAi";
import { AI_MESSAGES_ROLE, AI_MODEL } from './constants';

@Injectable()
export class OpenAiService {
   
    async getCompletions(text:string):Promise<string>{
        const stream = await openai.chat.completions.create({
            model: AI_MODEL,
            messages: [{ role: AI_MESSAGES_ROLE, content: text }],
        });
        if(stream)
            return stream.choices[0]?.message?.content
        return `Ошибка попробуй еще раз`
    }
}
