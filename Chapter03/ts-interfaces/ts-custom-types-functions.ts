function performCalculation(
    a: number,
    b: number,
    calculationFn: (x: number, y: number) => number
): void {
    console.log(`The result is ${calculationFn(a, b)}`);
}

performCalculation(
    5,
    10,
    (x: number, y: number) => x + y
);