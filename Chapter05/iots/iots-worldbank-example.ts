
import fetch from "node-fetch";

import * as t from "io-ts";
import {ThrowReporter} from "io-ts/lib/ThrowReporter";

const worldBankApiV2PaginationInformationValidator = t.type({
    page: t.number,
    pages: t.number,
    per_page: t.string,
    total: t.number
});

const worldBankApiV2CountryInformationValidator = t.type({
    id: t.string,
    iso2Code: t.string,
    name: t.string,
    capitalCity: t.string,
    longitude: t.string,
    latitude: t.string
});

const worldBankApiV2CountryResponseValidator = t.type({
    0: t.exact(worldBankApiV2PaginationInformationValidator),
    1: t.array(worldBankApiV2CountryInformationValidator)
});

// extract the corresponding static types
interface WorldBankApiV2PaginationInformation extends t.TypeOf<typeof worldBankApiV2PaginationInformationValidator> {}
interface WorldBankApiV2CountryInformation extends t.TypeOf<typeof worldBankApiV2CountryInformationValidator> {}
interface WorldBankApiV2CountryResponse extends t.TypeOf<typeof worldBankApiV2CountryResponseValidator> {}

async function main(): Promise<void> {
    const result = await fetch("https://api.worldbank.org/v2/countries?format=json&per_page=400");
    const jsonResult = await result.json();

    const validationResult = worldBankApiV2CountryResponseValidator.decode(jsonResult);

    // throw an error if validation fails
    ThrowReporter.report(validationResult);

    // here we know that the validation passed
    const countries = (validationResult.value as WorldBankApiV2CountryResponse)[1];

    console.log("Validation succeeded. Result: ", validationResult);

    console.log(`Found ${countries.length} countries`);

    countries.forEach(country => {
        console.log(`${country.name}'s capital is ${country.capitalCity}`);
    });

    Promise.resolve();
}

main().then(() => {
    console.log('Done');
});
