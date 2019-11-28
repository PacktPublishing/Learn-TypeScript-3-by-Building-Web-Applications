export interface WorldExplorerController {
  loadCountries(): Promise<void>;
  loadYears(): void;
  renderChart(): void;
}
