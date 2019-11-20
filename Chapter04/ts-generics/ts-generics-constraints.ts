abstract class Recipe {
    constructor(public name: string, public ingredients: string[]) {
    }
}

class ItalianRecipe extends Recipe {
}

class FrenchRecipe extends Recipe {
    constructor(name: string, ingredients: string[], public chef: string) {
        super(name, ingredients);
    }
}

class BrittanyRecipe extends FrenchRecipe {
}

// generic constraint
function displayRecipe<T extends FrenchRecipe>(recipe: T): void {
    console.log(`This is a french recipe conceived by the following chef: ${recipe.chef}`); // we know that it has the 'chef' property
    // ...
}

const brittanyRecipe = new BrittanyRecipe("Crèpe Bretonne", ["Eggs", "Flour", "Salt", "..."], "Bertrand Denis");
const italianRecipe = new ItalianRecipe("Spaghetti Bolognese", ["Pasta", "Tomatoes", "Garlic", "Onions", "..."]);

// displayRecipe(italianRecipe); // property 'chef' is missing
displayRecipe(brittanyRecipe); // This is a french recipe conceived by the following chef: Bertrand Denis