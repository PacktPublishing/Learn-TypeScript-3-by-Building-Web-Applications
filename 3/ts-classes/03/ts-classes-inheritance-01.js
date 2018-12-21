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
var Shape = /** @class */ (function () {
    function Shape(_shapeName) {
        this._shapeName = _shapeName;
        this._shapeName = "haha";
        this.displayInformation();
    }
    Object.defineProperty(Shape.prototype, "shapeName", {
        get: function () {
            return this._shapeName;
        },
        enumerable: true,
        configurable: true
    });
    Shape.prototype.displayInformation = function () {
        console.log("This shape is a " + this._shapeName);
    };
    Shape.prototype.doSomething = function () {
        console.log("Not interesting");
    };
    return Shape;
}());
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square(_width) {
        var _this = _super.call(this, "Square") || this;
        _this._width = _width;
        return _this;
    }
    Square.prototype.displayArea = function () {
        var area = this._width * this._width;
        console.log("This " + this.shapeName + " has an area of: " + area);
    };
    Square.prototype.displayPerimeter = function () {
        var perimeter = 2 * (this._width + this._width);
        console.log("This " + this.shapeName + " has a perimeter of : " + perimeter);
    };
    Square.prototype.doSomething = function () {
        console.log("Something more interesting");
    };
    return Square;
}(Shape));
