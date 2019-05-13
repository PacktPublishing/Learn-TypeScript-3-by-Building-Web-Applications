const mySymbol = Symbol('foo');
const myObject = {
    [mySymbol]: 'baz',
};

console.log(myObject[mySymbol]);