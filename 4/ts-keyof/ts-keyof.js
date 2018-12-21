"use strict";
function displayGameProperty(game, propertyName) {
    console.log(game[propertyName]);
}
var game = { name: "Chess", players: 2 };
displayGameProperty(game, "name");
//displayGameProperty(game, "foo"); // error TS2345: Argument of type '"foo"' is not assignable to parameter of type '"name" | "players"'
