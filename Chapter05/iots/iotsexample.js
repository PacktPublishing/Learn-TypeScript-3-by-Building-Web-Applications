"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var t = __importStar(require("io-ts"));
var ThrowReporter_1 = require("io-ts/lib/ThrowReporter");
var countryValidator = t.type({
    id: t.string,
    name: t.string,
    capitalCity: t.string,
});
var validCountry = {
    id: "BE",
    name: "Belgium",
    capitalCity: "Brussels"
};
var invalidCountry = {
    foo: "foo",
    name: "bar"
    // missing id
    // missing capitalCity
};
// validate both the valid and the invalid objects
var validationResultForValidCountry = countryValidator.decode(validCountry);
var validationResultForInvalidCountry = countryValidator.decode(invalidCountry);
// check the validation result
ThrowReporter_1.ThrowReporter.report(validationResultForValidCountry); // would throw if the object was invalid
var validCountryObject = validationResultForValidCountry.value;
console.log("Valid country's name: " + validCountryObject.name);
try {
    ThrowReporter_1.ThrowReporter.report(validationResultForInvalidCountry); // will throw an error
    console.log("Done!"); // will not be displayed!
}
catch (error) {
    console.error("An error occurred: ", error);
}
