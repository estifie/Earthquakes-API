"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller = __importStar(require("../controllers/earthquake.controller"));
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
/* GET all earthquakes */
router.get("/", middlewares_1.validator.validateGetAllEarthquakes, controller.getAllEarthquakes);
/* GET earthquake by code */
router.get("/:code/details", middlewares_1.validator.validateGetEarthquakeByCode, controller.getEarthquakeByCode);
/* GET last 30m earthquakes */
router.get("/30m", middlewares_1.validator.validateGetEarthquakesWithTime, controller.getEarthquakes30Minutes);
/* GET last 1h earthquakes */
router.get("/1h", middlewares_1.validator.validateGetEarthquakesWithTime, controller.getEarthquakes1Hour);
/* GET last 2h earthquakes */
router.get("/2h", middlewares_1.validator.validateGetEarthquakesWithTime, controller.getEarthquakes2Hours);
/* GET last 4h earthquakes */
router.get("/4h", middlewares_1.validator.validateGetEarthquakesWithTime, controller.getEarthquakes4Hours);
/* GET last 12h earthquakes */
router.get("/12h", middlewares_1.validator.validateGetEarthquakesWithTime, controller.getEarthquakes12Hours);
/* GET last 24h earthquakes */
router.get("/24h", middlewares_1.validator.validateGetEarthquakesWithTime, controller.getEarthquakes24Hours);
/* GET earthquakes above 2.5 magnitude */
router.get("/m2.5", middlewares_1.validator.validateGetEarthquakesWithMagnitude, controller.getEarthquakes2_5Magnitude);
/* GET earthquakes above 4.5 magnitude */
router.get("/m4.5", middlewares_1.validator.validateGetEarthquakesWithMagnitude, controller.getEarthquakes4_5Magnitude);
/* GET earthquakes above 6.0 magnitude */
router.get("/m6", middlewares_1.validator.validateGetEarthquakesWithMagnitude, controller.getEarthquakes6Magnitude);
/* GET Latest earthquake */
router.get("/latest", controller.getLatestEarthquake);
/* POST Create a new earthquake */
router.post("/", middlewares_1.authenticateApiKey, middlewares_1.validator.validateCreateEarthquake, controller.createEarthquake);
/* GET Fetch earthquakes from external API */
router.get("/admin/fetch", middlewares_1.authenticateApiKey, middlewares_1.validator.validateFetchEarthquakes, controller.fetchEarthquakes);
/* DELETE Delete an earthquake by id */
router.delete("/:id", middlewares_1.authenticateApiKey, middlewares_1.validator.validateDeleteEarthquake, controller.deleteEarthquake);
exports.default = router;
