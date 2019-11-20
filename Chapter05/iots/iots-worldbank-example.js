"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = __importDefault(require("node-fetch"));
var t = __importStar(require("io-ts"));
var ThrowReporter_1 = require("io-ts/lib/ThrowReporter");
var worldBankApiV2PaginationInformationValidator = t.type({
    page: t.number,
    pages: t.number,
    per_page: t.string,
    total: t.number
});
var worldBankApiV2CountryInformationValidator = t.type({
    id: t.string,
    iso2Code: t.string,
    name: t.string,
    capitalCity: t.string,
    longitude: t.string,
    latitude: t.string
});
var worldBankApiV2CountryResponseValidator = t.type({
    0: t.exact(worldBankApiV2PaginationInformationValidator),
    1: t.array(worldBankApiV2CountryInformationValidator)
});
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var result, jsonResult, validationResult, countries;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default("https://api.worldbank.org/v2/countries?format=json&per_page=400")];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, result.json()];
                case 2:
                    jsonResult = _a.sent();
                    validationResult = worldBankApiV2CountryResponseValidator.decode(jsonResult);
                    // throw an error if validation fails
                    ThrowReporter_1.ThrowReporter.report(validationResult);
                    countries = validationResult.value[1];
                    console.log("Validation succeeded. Result: ", validationResult);
                    console.log("Found " + countries.length + " countries");
                    countries.forEach(function (country) {
                        console.log(country.name + "'s capital is " + country.capitalCity);
                    });
                    Promise.resolve();
                    return [2 /*return*/];
            }
        });
    });
}
main().then(function () {
    console.log('Done');
});
