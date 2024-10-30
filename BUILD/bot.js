"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const https_1 = require("./https");
const helpers_1 = require("./games/helpers");
const games_1 = require("./games/games");
const commands_1 = require("./commands");
const dotenv_1 = __importDefault(require("dotenv"));
//Start SERVER HTTP
(0, https_1.startServer)();
// Init Telegram Bot
dotenv_1.default.config();
const token = process.env.TOKEN;
const BOT = new node_telegram_bot_api_1.default(token, { polling: true });
function contieneLink(text) {
    const linkRegex = /(https?:\/\/(?:www\.)?(?:xxx|sex|porn|xnxx|xvideos|adult|adultfriendfinder)(?:\.\w+)+(?:\/\S*)?)/i;
    const telegramLinkRegex = /(https?:\/\/t\.me\/\S+)/i;
    // Expresión regular para palabras inapropiadas
    const palabrasInapropiadas = /(porn|child\s*porn|sexo|xxx|sex|cp|lolis|porno|cepecito|cepe|caldo|l0lis|caldito|pornito|puto|puta|put@)/i;
    const englishBadWords = /\b(bitch|bitches|putisima|perra|perrisima|mamar|mamando|me la mama|asshole|ass|motherfucker|mother fucker|son of a bitch|fuck you|fuck|pussy|dick|cock|maricon|maricón|maricones|pendejo|estupido|stupid|estúpido|marica|mierda|shit|idiota|idiot|fucker|cagon|cagón|Chamaco miado|morro miado|cvlo|chingo|chupapija|pija|verga|vrg|tragapito|comeverga|caremonda|vrga|comemonda|chingar|chingas|chingando|pendejos|pendejete|chispas|culon|culos|culones|culero|culo|me la pelan|coño|vagina|Joder|cuka|cuca|panochon|panocha|vaginita|vergita|vergitas|te empinan|se vino de pechito|comete esta|furro|1o1lis|101is|lol's|lol1s|Alguien para intercambio|101i5|put4|mrd|alv|m1ado|miadas|buenos dias a todos|te faltan huevos|mamame|me la pelas|pelaste|vrgas|vergas|bobocagao|cagado|conchetumadre|caraanchoa|anchoa|concha|pelotudo|soplanucas|benitocamelo|tocameesta|tocamesta)\b/gi;
    // Enlaces permitidos: se incluyen las URLs deseadas
    const enlacePermitido = /https?:\/\/t\.me\/(GameSearchOficial|juegosdelhimalaya)(\/\S*)?/i;
    // Normalizar el texto para eliminar espacios adicionales
    const textoNormalizado = text.trim();
    // Verificación de coincidencia directa
    console.log(`Verificando el texto: ${textoNormalizado}`);
    console.log(`Contiene palabra inapropiada: ${palabrasInapropiadas.test(textoNormalizado)}`);
    if (enlacePermitido.test(textoNormalizado)) {
        return false; // Si es un enlace permitido, retorna false (no es inapropiado)
    }
    return (englishBadWords.test(textoNormalizado) ||
        linkRegex.test(textoNormalizado) ||
        telegramLinkRegex.test(textoNormalizado) ||
        palabrasInapropiadas.test(textoNormalizado));
}
// Stickers Welcome's
// Store sticker id
const stickerWelcomeIds = [];
const stickerWelcomePackName = 'BOT153';
BOT.getStickerSet(stickerWelcomePackName).then((stickerSet) => {
    console.log(`ID del sticker pack: ${stickerSet.name}`);
    stickerSet.stickers.forEach(sticker => {
        stickerWelcomeIds.push(sticker.file_id); // Almacena el ID del sticker
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
            .catch((err) => {
            console.error("Error al eliminar el mensaje:", err.message);
        });
    }
});
// Stickers oldest
const stickerPackName = 'CotorreoDickman';
const stckid = [];
BOT.getStickerSet(stickerPackName).then((stickerSet) => {
    console.log(`ID del sticker pack: ${stickerSet.name}`);
    stickerSet.stickers.forEach(sticker => {
        stckid.push(sticker.file_id); // Almacena el ID del sticker
    });
}).catch(error => {
    console.error('Error al obtener el sticker pack:', error);
});
// Maneja la unión de nuevos miembros
BOT.on("new_chat_members", (msg) => {
    const chatId = msg.chat.id;
    const newMembers = msg.new_chat_members;
    newMembers === null || newMembers === void 0 ? void 0 : newMembers.forEach((member) => {
        const username = member.username || member.first_name;
        // Selecciona un sticker aleatorio
        const stickerFileId = stickerWelcomeIds[Math.floor(Math.random() * stickerWelcomeIds.length)];
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
    const stickerFileId = stckid[Math.floor(Math.random() * stickerWelcomeIds.length)];
    // Envía el sticker
    BOT.sendSticker(chatId, stickerFileId)
        .then(() => {
        console.log(`Sticker enviado a ${chatId} en respuesta a /gn`);
    })
        .catch(error => {
        console.error("Error al enviar el sticker:", error);
    });
});
// Sandbox
BOT.onText(/\/gsandbox/, (msg) => {
    const chatId = msg.chat.id;
    const message = (0, helpers_1.formatGameList)(games_1.gamesSandBox, "Sandbox");
    BOT.sendMessage(chatId, message, { parse_mode: "Markdown" });
});
// Incest
BOT.onText(/\/gincest/, (msg) => {
    const chatId = msg.chat.id;
    const message = (0, helpers_1.formatGameList)(games_1.gamesIncest, "Incesto");
    BOT.sendMessage(chatId, message, { parse_mode: "Markdown" });
});
// Commands
(0, commands_1.Commands)(BOT);
//# sourceMappingURL=bot.js.map