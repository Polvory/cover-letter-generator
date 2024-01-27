export const getOpenAiConfig = () => {
    return {
        token: String(process.env.AI_TOKEN),
    }

}