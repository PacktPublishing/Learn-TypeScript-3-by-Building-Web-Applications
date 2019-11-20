import {Country, DataPoint} from "../domain";

export interface PopulationService {
    getAllCountries(): Promise<Country[]>
    getCountry(countryCode: string): Promise<Country>
    getTotalPopulation(country: Country, dateRange: string): Promise<DataPoint[]>
    getMalePopulation(country: Country, dateRange: string): Promise<DataPoint[]>
    getFemalePopulation(country: Country, dateRange: string): Promise<DataPoint[]>
    getLifeExpectancy(country: Country, dateRange: string): Promise<DataPoint[]>
    getAdultMaleLiteracy(country: Country, dateRange: string): Promise<DataPoint[]>
    getAdultFemaleLiteracy(country: Country, dateRange: string): Promise<DataPoint[]>
    getMaleSurvivalToAge65(country: Country, dateRange: string): Promise<DataPoint[]>
    getFemaleSurvivalToAge65(country: Country, dateRange: string): Promise<DataPoint[]>
}
