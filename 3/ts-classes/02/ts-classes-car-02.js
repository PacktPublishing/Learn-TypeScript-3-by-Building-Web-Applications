"use strict";
var ColoredCar = /** @class */ (function () {
    function ColoredCar(color) {
        this._color = color;
    }
    ColoredCar.prototype.displayColor = function () {
        console.log("Color of this car: ", this.color);
    };
    Object.defineProperty(ColoredCar.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (color) {
            this._color = color;
        },
        enumerable: true,
        configurable: true
    });
    ColoredCar.prototype.resetColor = function () {
        this._color = ColoredCar.DEFAULT_COLOR;
    };
    ColoredCar.DEFAULT_COLOR = "Red";
    return ColoredCar;
}());
