"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Recipe = /** @class */ (function () {
    function Recipe(name, ingredients) {
        this.name = name;
        this.ingredients = ingredients;
    }
    return Recipe;
}());
var ItalianRecipe = /** @class */ (function (_super) {
    __extends(ItalianRecipe, _super);
    function ItalianRecipe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ItalianRecipe;
}(Recipe));
var FrenchRecipe = /** @class */ (function (_super) {
    __extends(FrenchRecipe, _super);
    function FrenchRecipe(name, ingredients, chef) {
        var _this = _super.call(this, name, ingredients) || this;
        _this.chef = chef;
        return _this;
    }
    return FrenchRecipe;
}(Recipe));
var BrittanyRecipe = /** @class */ (function (_super) {
    __extends(BrittanyRecipe, _super);
    function BrittanyRecipe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BrittanyRecipe;
}(FrenchRecipe));
// generic constraint
function displayRecipe(recipe) {
    console.log("This is a french recipe conceived by the following chef: " + recipe.chef); // we know that it has the 'chef' property
    // ...
}
var brittanyRecipe = new BrittanyRecipe("Crèpe Bretonne", ["Eggs", "Flour", "Salt", "..."], "Bertrand Denis");
var italianRecipe = new ItalianRecipe("Spaghetti Bolognese", ["Pasta", "Tomatoes", "Garlic", "Onions", "..."]);
// displayRecipe(italianRecipe); // property 'chef' is missing
displayRecipe(brittanyRecipe); // This is a french recipe conceived by the following chef: Bertrand Denis
