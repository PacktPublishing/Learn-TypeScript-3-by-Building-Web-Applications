// my-utils-module.ts

const myPrivateKey: string = "Secret";
export const myPublicKey: string = "Public";

export enum MessageType {
    INFORMATION,
    WARNING,
    ERROR,
    DEBUG
}

// exported interface
export interface Message {
    content: string,
    type: MessageType
}

// private function
function logToConsole(message: Message): void {
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
export function log(message: Message): void {
    logToConsole(message);
}
