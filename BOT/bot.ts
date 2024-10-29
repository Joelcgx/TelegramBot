import TelegramBot from "node-telegram-bot-api";
import { startServer } from "./https";


//Start SERVER HTTP
startServer();

// Init Telegram Bot
const token = "8084695773:AAHYt71K8PvlrRQT64BoY6GhipLR6D41lXs";
const BOT = new TelegramBot(token, { polling: true });


// Function with regex for delete this bad words
function contieneLink(text: string): boolean {
    // Expresiones regulares para enlaces XXX, enlaces de grupos de Telegram, y otros enlaces de spam
    const linkRegex =
        /(https?:\/\/(?:www\.)?(?:xxx|sex|porn|xnxx|xvideos|adult|adultfriendfinder)(?:\.\w+)+(?:\/\S*)?)/i; // Enlaces XXX
    const telegramLinkRegex = /(https?:\/\/t\.me\/\S+)/i; // Enlaces de Telegram
    const palabrasInapropiadas =
        /\b(porn|child porn|sexo|xxx|sex|cp|lolis|porno|cepecito|cepe|caldo|l0lis|caldito)\b/i; // Palabras inapropiadas
    return (
        linkRegex.test(text) ||
        telegramLinkRegex.test(text) ||
        palabrasInapropiadas.test(text)
    );
}

// Store sticker id
const stickerIds: string[] = [];

const stickerPackName = 'CotorreoDickman';

BOT.getStickerSet(stickerPackName).then((stickerSet) => {
    console.log(`ID del sticker pack: ${stickerSet.name}`);
    stickerSet.stickers.forEach(sticker => {
        stickerIds.push(sticker.file_id); // Almacena el ID del sticker
    });
}).catch(error => {
    console.error('Error al obtener el sticker pack:', error);
});

// Handle all messages in group or chat
BOT.on("message", (msg) => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const username = msg.from ? (msg.from.username || msg.from.first_name) : "Usuario desconocido";

    // Revisa si el mensaje contiene un enlace o palabra inapropiada
    if (msg.text && contieneLink(msg.text)) {
        BOT.deleteMessage(chatId, messageId)
            .then(() => {
                console.log(`Mensaje eliminado en el chat ${chatId} con ID: ${messageId}`);
                BOT.sendMessage(chatId, `⚠️ Se eliminó un mensaje inapropiado de ${username}: "${msg.text}".`);
            })
            .catch((err: Error) => {
                console.error("Error al eliminar el mensaje:", err.message);
            });
    }
});

// Maneja la unión de nuevos miembros
BOT.on("new_chat_members", (msg) => {
    const chatId = msg.chat.id;
    const newMembers = msg.new_chat_members;

    newMembers?.forEach((member) => {
        const username = member.username || member.first_name;

        // Selecciona un sticker aleatorio
        const stickerFileId = stickerIds[Math.floor(Math.random() * stickerIds.length)];

        // Envía un sticker al nuevo miembro
        BOT.sendSticker(chatId, stickerFileId);

        // Envía un mensaje de bienvenida
        BOT.sendMessage(chatId, `🎉 ¡Bienvenido, ${username}! Disfruta del grupo.`);
    });
});


// Comando /gn que envía un sticker
BOT.onText(/\/gn/, (msg) => {
    const chatId = msg.chat.id;

    // Selecciona un sticker aleatorio del pack
    const stickerFileId = stickerIds[Math.floor(Math.random() * stickerIds.length)];

    // Envía el sticker
    BOT.sendSticker(chatId, stickerFileId)
        .then(() => {
            console.log(`Sticker enviado a ${chatId} en respuesta a /gn`);
        })
        .catch(error => {
            console.error("Error al enviar el sticker:", error);
        });
});

console.log("Bot está funcionando...");