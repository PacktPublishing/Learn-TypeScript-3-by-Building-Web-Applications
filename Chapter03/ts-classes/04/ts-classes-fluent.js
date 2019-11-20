"use strict";
var Calculator = /** @class */ (function () {
    function Calculator(_currentValue) {
        if (_currentValue === void 0) { _currentValue = 0; }
        this._currentValue = _currentValue;
    }
    Calculator.prototype.add = function (a) {
        this._currentValue += a;
        return this;
    };
    Calculator.prototype.substract = function (a) {
        this._currentValue -= a;
        return this;
    };
    Calculator.prototype.multiply = function (a) {
        this._currentValue *= a;
        return this;
    };
    Calculator.prototype.divide = function (a) {
        this._currentValue /= a;
        return this;
    };
    Object.defineProperty(Calculator.prototype, "value", {
        get: function () {
            return this._currentValue;
        },
        enumerable: true,
        configurable: true
    });
    return Calculator;
}());
var result = new Calculator(0)
    .add(5) // returns this
    .multiply(2) // returns this
    .add(10) // we can keep chaining method calls
    .divide(4)
    .substract(2)
    .value; // returns the value
console.log("Result: " + result); // 3
