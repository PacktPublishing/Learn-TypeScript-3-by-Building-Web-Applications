import * as t from "io-ts";
import {ThrowReporter} from "io-ts/lib/ThrowReporter";

const countryValidator = t.type({
    id: t.string,
    name: t.string,
    capitalCity: t.string,
});

// extract the corresponding static types
interface Country extends t.TypeOf<typeof countryValidator> {}

const validCountry:Country = {
    id: "BE",
    name: "Belgium",
    capitalCity: "Brussels"
};

const invalidCountry: unknown = {
    foo: "foo",
    name: "bar"
    // missing id
    // missing capitalCity
};

// validate both the valid and the invalid objects
const validationResultForValidCountry = countryValidator.decode(validCountry);
const validationResultForInvalidCountry = countryValidator.decode(invalidCountry);

// check the validation result
ThrowReporter.report(validationResultForValidCountry); // would throw if the object was invalid

const validCountryObject = validationResultForValidCountry.value as Country;

console.log(`Valid country's name: ${validCountryObject.name}`);

try {
    ThrowReporter.report(validationResultForInvalidCountry); // will throw an error
    console.log("Done!"); // will not be displayed!
} catch(error) {
    console.error("An error occurred: ", error);
}

