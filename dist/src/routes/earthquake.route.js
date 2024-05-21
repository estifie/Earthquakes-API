"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const earthquake_controller_1 = __importDefault(require("../controllers/earthquake.controller"));
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
/* GET all earthquakes */
router.get("/", earthquake_controller_1.default.getAllEarthquakes);
// /* GET last 1h earthquakes */
// router.get("/1h", earthquakeController.getLastHourEarthquakes);
// /* GET last 24h earthquakes */
// router.get("/24h", earthquakeController.getLastDayEarthquakes);
// /* GET last 7d earthquakes */
// router.get("/7d", earthquakeController.getLastWeekEarthquakes);
// /* GET earthquakes above 2.5 magnitude */
// router.get("/m2.5", earthquakeController.getEarthquakesAbove2_5);
// /* GET earthquakes above 4.5 magnitude */
// router.get("/m4.5", earthquakeController.getEarthquakesAbove4_5);
// /* GET earthquakes above 6.0 magnitude */
// router.get("/m6.0", earthquakeController.getEarthquakesAbove6_0);
router.post("/", middlewares_1.authenticateApiKey, middlewares_1.validateCreateEarthquake, earthquake_controller_1.default.createEarthquake);
router.get("/admin", middlewares_1.authenticateApiKey, earthquake_controller_1.default.getAllEarthquakesAdmin);
router.get("/admin/fetch", middlewares_1.authenticateApiKey, earthquake_controller_1.default.fetchEarthquakes);
router.delete("/:id", middlewares_1.authenticateApiKey, earthquake_controller_1.default.deleteEarthquake);
exports.default = router;
