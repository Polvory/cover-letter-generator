import AsyncOpenAI from "openai";
import { getOpenAiConfig } from "../config/OpenAi.config";

export const openai =  new AsyncOpenAI({
    apiKey: getOpenAiConfig().token,
});
