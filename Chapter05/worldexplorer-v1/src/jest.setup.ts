import {GlobalWithFetchMock} from "jest-fetch-mock";

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;

// load the mock for the Fetch API: https://www.npmjs.com/package/jest-fetch-mock
// and set it on the global scope
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;
