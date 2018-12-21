"use strict";
function performCalculation(a, b, calculationFn) {
    console.log("The result is " + calculationFn(a, b));
}
performCalculation(5, 10, function (x, y) { return x + y; });
