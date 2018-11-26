function multiply(a: number, b: number) {
    const result: number = a * b;
    console.log(`The multiplication of ${a}*${b} equals to ${result}`);
    return result;
}

multiply(1, 2);
multiply(2,2);
multiply(-10,10);
multiply("foo", 'bar');
