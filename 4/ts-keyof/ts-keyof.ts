interface Game {
    name: string;
    players: number;
}

function displayGameProperty(game: Game, propertyName: keyof Game): void {
    console.log(game[propertyName]);
}

const game: Game = {name: "Chess", players: 2};

displayGameProperty(game,"name");

//displayGameProperty(game, "foo"); // error TS2345: Argument of type '"foo"' is not assignable to parameter of type '"name" | "players"'
