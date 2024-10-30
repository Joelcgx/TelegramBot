"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatGameList = formatGameList;
function formatGameList(games, category) {
    if (games.length === 0) {
        return `No se encontraron juegos de ${category}.`;
    }
    let message = `🎮 *Juegos de ${category}*:\n\n`;
    games.forEach((game, index) => {
        message += `${index + 1}. [${game.name}](${game.link})\n`;
    });
    return message;
}
//# sourceMappingURL=helpers.js.map