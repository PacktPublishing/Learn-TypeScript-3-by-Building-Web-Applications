"use strict";
var observer = {
    next: function (x) { return console.log("Observer got a next value: " + x); },
    error: function (err) { return console.error("Observer got an error: " + err); },
    complete: function () { return console.log('Observer got a completion notification'); }
};
//# sourceMappingURL=observer.js.map