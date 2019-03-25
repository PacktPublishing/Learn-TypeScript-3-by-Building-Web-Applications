"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var myObservable1 = rxjs_1.from([1, 2, 3]);
var myObservable2 = rxjs_1.from(new Promise(function (resolveFn) { return resolveFn('Foo'); }));
// ...
//# sourceMappingURL=observableFrom.js.map