"use strict";
// my-utils-module.ts
Object.defineProperty(exports, "__esModule", { value: true });
var myPrivateKey = "Secret";
exports.myPublicKey = "Public";
var MessageType;
(function (MessageType) {
    MessageType[MessageType["INFORMATION"] = 0] = "INFORMATION";
    MessageType[MessageType["WARNING"] = 1] = "WARNING";
    MessageType[MessageType["ERROR"] = 2] = "ERROR";
    MessageType[MessageType["DEBUG"] = 3] = "DEBUG";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
// private function
function logToConsole(message) {
    switch (message.type) {
        case MessageType.INFORMATION:
            console.log(message.content);
        case MessageType.DEBUG:
            console.debug(message.content);
        case MessageType.WARNING:
            console.warn(message.content);
        case MessageType.ERROR:
            console.error(message.content);
        default:
            console.error(message.content);
    }
    console.log(message);
}
// exported function
function log(message) {
    logToConsole(message);
}
exports.log = log;
