function foo(bar: { firstName: string, lastName: string}): void {
    console.log(`Hello ${bar.firstName}.. or should I call you Mr ${bar.lastName}?`);
}

foo({
    firstName: "Sebastien",
    lastName: "Dubois"
});