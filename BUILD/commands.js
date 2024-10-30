"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commands = Commands;
function Commands(BOT) {
    // Display game channels
    BOT.onText(/\/channels/, (msg) => {
        const chatId = msg.chat.id;
        const message = `Estos son los canales de juegos, aquí encontrarás los links de los juegos y los APK directos subidos en Telegram. 📁\n\n` +
            `*GameSearch | HOT*\n[https://t.me/GameSearchOficial](https://t.me/GameSearchOficial)\n\n` +
            `*Himalaya Games*\n[https://t.me/juegosdelhimalaya](https://t.me/juegosdelhimalaya)`;
        BOT.sendMessage(chatId, message, { parse_mode: "Markdown" });
    });
    // Show rules of the group
    BOT.onText(/\/reglas/, (msg) => {
        const chatId = msg.chat.id;
        const rulesMsg = `<b>Reglas del Grupo:</b>\n✨<b>Bienvenidos al grupo del canal GameSearch</b>, para estar aquí deberán respetar las siguientes reglas:\n\n<b>Al que NO CUMPLA con estas Reglas se le dará</b> <b>BAN</b> 🚫 por <b>10 AÑOS</b>.\n1. Queda <b>PROHIBIDO COMPARTIR INFORMACIÓN</b> de los adelantos que subo para <b>LOS VIDEOS</b>.<i> (Se prohíbe dar los nombres de dicho juego)</i>\n\n2. <b>NO Compartir Información Personal.</b> <i>(Si quieren hacerlo, hablen por privado)</i>\n\n3. Se <b>PERMITE</b> compartir <b>ENLACES</b> de otros grupos o canales...<i> (depende de qué sea)</i>\n4. <b>Respetar todos los gustos y preferencias</b> de los demás miembros del grupo.\n\n5. <b>El ACOSO y la TOXICIDAD</b> están estrictamente <b>PROHIBIDO</b>.\n\n6. <b>PROHIBIDO</b> hablar de temas <b>DELICADOS e ILEGALES</b>.\n\n7. Se <b>puede</b> hacer uso de <b>malas palabras</b>, siempre y cuando no te pases de <b>V****</b>.\n\n8. Cualquier persona que trate de <b>atentar contra el grupo</b> se le hará el <b>MIL AÑOS de DOLOR</b> por cada miembro de este.\n\n9. En caso de <b>compartir los juegos</b>, deberán dar los <b>créditos</b>.<i> (Creador, porteador y traductor)</i>\n\n10. Si quieres <b>apoyar a algún CREADOR</b>, pedir <b>INFORMACIÓN</b> al ADMIN.\n\n11. <b>No abusar</b> de los stickers, fotos y/o videos.\n\n12. Queda <b>prohibido compartir todo tipo de archivos</b> sobre el género <b>Lol1s</b>.\n\n<i>Cualquiera que INFRINJA las REGLAS será advertido o BANEADO.</i>\n\n<i>El grupo NO se hace RESPONSABLE de FALLAS en los JUEGOS.</i>\n\n<b>Si NO CUMPLES con estas REGLAS, SERÁS BANEADO de POR VIDA, del GRUPO y CANAL de YOUTUBE.</b>`;
        BOT.sendMessage(chatId, rulesMsg, { parse_mode: "HTML" });
    });
    // Show commands
    BOT.onText(/\/commands/, (msg) => {
        const chatId = msg.chat.id;
        const commands = `*Estos son los comandos que puedas ingresar para encontrar cosas que te interesen cualquier duda consultalo con algún admin o miembro.*\n/reglas\n/channels\n/gsandbox\n/gincest\n/recomendations\n`;
        BOT.sendMessage(chatId, commands, { parse_mode: "Markdown" });
    });
}
//# sourceMappingURL=commands.js.map