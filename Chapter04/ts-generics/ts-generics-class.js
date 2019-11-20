"use strict";
var NaiveMap = /** @class */ (function () {
    function NaiveMap() {
        this._keys = [];
        this._values = [];
    }
    NaiveMap.prototype.contains = function (key) {
        var result = this._keys.indexOf(key);
        return result !== -1;
    };
    NaiveMap.prototype.put = function (key, value) {
        if (!this.contains(key)) {
            this._keys.push(key);
            this._values.push(value);
        }
    };
    NaiveMap.prototype.get = function (key) {
        if (this.contains(key)) {
            return this._values[this._keys.indexOf(key)];
        }
        else {
            return undefined;
        }
    };
    return NaiveMap;
}());
var Thing = /** @class */ (function () {
    function Thing(name) {
        this.name = name;
    }
    return Thing;
}());
var naiveMap = new NaiveMap();
naiveMap.put("foo", new Thing("The thing"));
console.log(naiveMap.contains("foo")); // true
console.log(naiveMap.get("foo")); // Thing { name: 'The thing' }
