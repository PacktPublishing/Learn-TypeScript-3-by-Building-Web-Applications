"use strict";
// my-module.ts
Object.defineProperty(exports, "__esModule", { value: true });
var my_utils_module_1 = require("./my-utils-module");
console.log("Public key: ", my_utils_module_1.myPublicKey);
var infoMessage = {
    content: "Hello world",
    type: my_utils_module_1.MessageType.INFORMATION
};
var errorMessage = {
    content: "Oopsie doopsie",
    type: my_utils_module_1.MessageType.ERROR
};
my_utils_module_1.log(infoMessage);
my_utils_module_1.log(errorMessage);
