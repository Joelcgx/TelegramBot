import TelegramBot from "node-telegram-bot-api";

export async function isAdmin(chatId: TelegramBot.ChatId, userId: number, BOT: TelegramBot) {
    try {
        const chatMember = await BOT.getChatMember(chatId, userId);
        return chatMember.status == "administrator" || chatMember.status == "creator";
    } catch (error: unknown) {
        console.error(`Verification Error this ${error}`);
        return false;
    }
}