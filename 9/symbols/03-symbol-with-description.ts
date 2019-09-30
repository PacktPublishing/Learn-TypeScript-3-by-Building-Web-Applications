const theAnswer = Symbol(42);
const anotherAnswer = Symbol(42);

// the following would fail to compile in TypeScript but would just return false in JavaScript
// here's the TypeScript error it triggers: TS2367: This condition will always return 'false' since the types 'unique symbol' and 'unique symbol' have no overlap.
//console.log(theAnswer === anotherAnswer); // false

const mySuperSymbol = Symbol('This is a fantastic symbol');
