export function formatGameList(games: { name: string; link: string }[], category: string): string {
    if (games.length === 0) {
        return `No se encontraron juegos de ${category}.`;
    }

    let message = `🎮 *Juegos de ${category}*:\n\n`;
    games.forEach((game, index) => {
        message += `${index + 1}. [${game.name}](${game.link})\n`;
    });

    return message;
}