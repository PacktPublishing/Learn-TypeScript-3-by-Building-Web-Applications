class Calculator {
    constructor(private _currentValue: number = 0) {

    }

    add(a: number): this {
        this._currentValue += a;
        return this;
    }

    substract(a: number): this {
        this._currentValue -= a;
        return this;
    }

    multiply(a: number): this {
        this._currentValue *= a;
        return this;
    }

    divide(a: number): this {
        this._currentValue /= a;
        return this;
    }

    get value(): number {
        return this._currentValue;
    }
}

let result: number = new Calculator(0)
    .add(5) // returns this
    .multiply(2) // returns this
    .add(10) // we can keep chaining method calls
    .divide(4)
    .substract(2)
    .value; // returns the value

console.log(`Result: ${result}`); // 3
