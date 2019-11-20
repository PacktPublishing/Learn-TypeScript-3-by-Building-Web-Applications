import * as t from "io-ts";

export enum WorldBankApiV2Indicators {
    TOTAL_POPULATION = "SP.POP.TOTL",
    TOTAL_MALE_POPULATION = "SP.POP.TOTL.MA.IN",
    TOTAL_FEMALE_POPULATION = "SP.POP.TOTL.FE.IN",
    ADULT_MALE_LITERACY = "SE.ADT.LITR.MA.ZS",
    ADULT_FEMALE_LITERACY = "SE.ADT.LITR.FE.ZS",
    LIFE_EXPECTANCY = "SP.DYN.LE00.IN",
    ADULT_MALE_SURVIVAL_TO_65 = "SP.DYN.TO65.MA.ZS",
    ADULT_FEMALE_SURVIVAL_TO_65 = "SP.DYN.TO65.FE.ZS"
}

export const enum WorldBankApiV2Params {
    FORMAT = "format",
    DATE = "date",
    PER_PAGE = "per_page"
}

export const enum WorldBankApiV2Formats {
    JSON = "json",
    XML = "xml"
}

export const enum WorldBankApiV2 {
    VERSION = "v2",
    COUNTRIES_API_PREFIX = "countries",
    INDICATORS_API_PREFIX = "indicators"
}

export const worldBankApiV2PaginationInformationValidator = t.type({
    page: t.number,
    pages: t.number,
    per_page: t.union([t.string, t.number]),
    total: t.number
});

export const worldBankApiV2CountryInformationValidator = t.type({
    id: t.string,
    iso2Code: t.string,
    name: t.string,
    capitalCity: t.string,
    longitude: t.string,
    latitude: t.string
});

export const worldBankApiV2IndicatorInformationValidator = t.type({
    countryiso3code: t.string,
    date: t.string,
    value: t.union([t.number, t.null]),
    unit: t.string,
    decimal: t.number
});

export const worldBankApiV2CountryResponseValidator = t.type({
    0: worldBankApiV2PaginationInformationValidator,
    1: t.array(worldBankApiV2CountryInformationValidator)
});

export const worldBankApiV2IndicatorResponseValidator = t.type({
    0: worldBankApiV2PaginationInformationValidator,
    1: t.union([t.array(worldBankApiV2IndicatorInformationValidator), t.null]) // there might be no data matching our query
});

// extract the corresponding static types
export interface WorldBankApiV2PaginationInformation extends t.TypeOf<typeof worldBankApiV2PaginationInformationValidator> {}
export interface WorldBankApiV2CountryInformation extends t.TypeOf<typeof worldBankApiV2CountryInformationValidator> {}
export interface WorldBankApiV2CountryResponse extends t.TypeOf<typeof worldBankApiV2CountryResponseValidator> {}
export interface WorldBankApiV2IndicatorResponse extends t.TypeOf<typeof worldBankApiV2IndicatorResponseValidator> {}
