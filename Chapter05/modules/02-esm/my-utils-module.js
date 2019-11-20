"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var myPrivateKey = "Secret";
exports.myPublicKey = "Public";
// exported function
function bar(message) {
    say(message);
}
exports.bar = bar;
// private function
function say(message) {
    console.log(message);
}
