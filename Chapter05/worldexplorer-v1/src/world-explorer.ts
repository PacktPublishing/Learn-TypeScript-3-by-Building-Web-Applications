import {PopulationService, PopulationServiceImpl} from "services";
import {WorldExplorerHTMLView, WorldExplorerView} from "./views";
import {WorldExplorerControllerImpl, WorldExplorerController} from "./controllers";

console.log("WorldExplorer - Loading...");

const populationService: PopulationService = new PopulationServiceImpl('https://api.worldbank.org');
const view: WorldExplorerView = new WorldExplorerHTMLView();
const controller: WorldExplorerController = new WorldExplorerControllerImpl(populationService, view);

interface CustomWindow extends Window {
    worldExplorerController?: WorldExplorerController
}

const customWindow: CustomWindow = window;
customWindow.worldExplorerController = controller;
