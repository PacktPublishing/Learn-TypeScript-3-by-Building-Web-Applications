"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var observer1 = {
    next: function (value) { return console.log("Observer 1: " + value); }
};
var observer2 = {
    next: function (value) { return console.log("Observer 1: " + value); }
};
var mySubject = new rxjs_1.Subject();
mySubject.subscribe(observer1);
mySubject.subscribe(observer2);
mySubject.next("Hello");
mySubject.next("World");
// Output:
// Observer 1: Hello
// Observer 2: Hello
// Observer 1: World
// Observer 2: World
//# sourceMappingURL=rxjs-subject.js.map