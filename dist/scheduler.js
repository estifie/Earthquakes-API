"use strict";
// This file contains scheduled tasks that are run at specific intervals
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initScheduler = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const logger_1 = __importDefault(require("./logger"));
const constants_1 = require("./src/config/constants");
const earthquake_service_1 = __importDefault(require("./src/services/earthquake.service"));
const fetchEarthquakesScheduler = () => __awaiter(void 0, void 0, void 0, function* () {
    if (constants_1.SCHEDULER.INITIAL_FETCH) {
        logger_1.default.info("Fetching earthquakes for the first time");
        yield earthquake_service_1.default.fetchEarthquakes(true, false);
        yield new Promise((resolve) => setTimeout(resolve, constants_1.SCHEDULER.INITIAL_FETCH_DELAY));
    }
    node_cron_1.default.schedule(constants_1.SCHEDULER.FETCH_INTERVAL_CRON, () => __awaiter(void 0, void 0, void 0, function* () {
        logger_1.default.info("Fetching earthquakes every 10 seconds");
        yield earthquake_service_1.default.fetchEarthquakes(false, true);
    }));
});
const initScheduler = () => __awaiter(void 0, void 0, void 0, function* () {
    constants_1.SCHEDULER.FETCH ? yield fetchEarthquakesScheduler() : logger_1.default.info("Earthquake Fetch Scheduler is disabled");
});
exports.initScheduler = initScheduler;
