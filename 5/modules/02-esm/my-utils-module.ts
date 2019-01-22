const myPrivateKey = "Secret";

export const myPublicKey = "Public";

// exported function
export function bar(message) {
    say(message);
}

// private function
function say(message) {
    console.log(message);
}
