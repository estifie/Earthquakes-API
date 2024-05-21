"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const earthquake_route_1 = __importDefault(require("./earthquake.route"));
const health_route_1 = __importDefault(require("./health.route"));
const source_route_1 = __importDefault(require("./source.route"));
const router = (0, express_1.Router)();
router.use("/earthquakes", earthquake_route_1.default);
router.use("/health", health_route_1.default);
router.use("/sources", source_route_1.default);
exports.default = router;
