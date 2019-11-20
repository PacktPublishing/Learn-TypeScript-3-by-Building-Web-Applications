import {Country} from "../domain";
import {ChartDetails} from "./chart-details.intf";

export interface WorldExplorerView {
    displayErrorMessage(message: string): void;
    displayCountries(countries: Country[]): void;
    displayYears(years: number[]): void;
    getChartFormDetails(): { error?: string, countryId?: string, indicator?: string, fromYear?: number, toYear?: number, chartType?: string};
    displayChart(chartDetails: ChartDetails): void;
}
