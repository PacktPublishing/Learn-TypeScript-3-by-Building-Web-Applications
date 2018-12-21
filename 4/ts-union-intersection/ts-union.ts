interface BoardGame {
    name: string;
    description: string;
    minimalAge: number;
    players: string;
    duration: string;
}

interface VideoGame {
    name: string
    description: string;
    minimalAge: number;
    players: string;
    online: boolean;
}

function displayGame(game: VideoGame | BoardGame) {
    console.log(`Game name: ${game.name}`);
}
