"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const earthquake_route_1 = __importDefault(require("./earthquake.route"));
const health_route_1 = __importDefault(require("./health.route"));
const source_route_1 = __importDefault(require("./source.route"));
const router = (0, express_1.Router)();
router.use("/earthquakes", middlewares_1.authenticateRapidAPI, earthquake_route_1.default);
router.use("/ping", health_route_1.default);
router.use("/sources", middlewares_1.authenticateRapidAPI, source_route_1.default);
exports.default = router;
