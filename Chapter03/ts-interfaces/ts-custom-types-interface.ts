interface Person {
    firstName: string,
    lastName: string,
    age: number
}

function sayHelloTo(bar: Person): void {
    console.log(`Hello ${bar.firstName}.. or should I call you Mr ${bar.lastName}?`);
}

let persjohnDoeon: Person = {
    firstName: "John",
    lastName: "Doe",
    age: 42
};

sayHelloTo(johnDoe);
