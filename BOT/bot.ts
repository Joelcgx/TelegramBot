import TelegramBot from "node-telegram-bot-api";
import { startServer } from "./https";
import { formatGameList } from "./games/helpers";
import { gamesIncest, gamesSandBox } from "./games/games";
import { Commands } from "./commands";


//Start SERVER HTTP
startServer();

// Init Telegram Bot
const token = "8084695773:AAHYt71K8PvlrRQT64BoY6GhipLR6D41lXs";
const BOT = new TelegramBot(token, { polling: true });


function contieneLink(text: string): boolean {
    const linkRegex = /(https?:\/\/(?:www\.)?(?:xxx|sex|porn|xnxx|xvideos|adult|adultfriendfinder)(?:\.\w+)+(?:\/\S*)?)/i;
    const telegramLinkRegex = /(https?:\/\/t\.me\/\S+)/i;

    // Expresión regular para palabras inapropiadas
    const palabrasInapropiadas = /(porn|child\s*porn|sexo|xxx|sex|cp|lolis|porno|cepecito|cepe|caldo|l0lis|caldito|pornito|puto|puta|put@)/i;
    const englishBadWords = /\b(bitch|bitches|tu madre|asshole|ass|motherfucker|mother fucker|son of a bitch|fuck you|fuck|pussy|dick|cock|maricon|maricón|pendejo|estupido|stupid|estúpido|marica|mierda|shit|idiota|idiot|fucker|cagon|cagón|Chamaco miado|morro miado)\b/gi;

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

    return (
        englishBadWords.test(textoNormalizado) ||
        linkRegex.test(textoNormalizado) ||
        telegramLinkRegex.test(textoNormalizado) ||
        palabrasInapropiadas.test(textoNormalizado)
    );
}

// Stickers Welcome's
// Store sticker id
const stickerWelcomeIds: string[] = [];

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
            .catch((err: Error) => {
                console.error("Error al eliminar el mensaje:", err.message);
            });
    }
});

// Stickers oldest
const stickerPackName = 'CotorreoDickman';
const stckid: string[] = [];

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

    newMembers?.forEach((member) => {
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
    const message = formatGameList(gamesSandBox, "Sandbox");

    BOT.sendMessage(chatId, message, { parse_mode: "Markdown" });
});

// Incest
BOT.onText(/\/gincest/, (msg) => {
    const chatId = msg.chat.id;
    const message = formatGameList(gamesIncest, "Incesto");

    BOT.sendMessage(chatId, message, { parse_mode: "Markdown" });
});

// Commands
Commands(BOT);