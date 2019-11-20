// my-module.ts

import {log, Message, MessageType, myPublicKey} from "./my-utils-module";

console.log("Public key: ", myPublicKey);

const infoMessage: Message = {
    content: "Hello world",
    type: MessageType.INFORMATION
};

const errorMessage: Message = {
    content: "Oopsie doopsie",
    type: MessageType.ERROR
};

log(infoMessage);

log(errorMessage);