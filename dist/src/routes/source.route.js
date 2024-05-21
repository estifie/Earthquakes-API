"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const source_controller_1 = __importDefault(require("../controllers/source.controller"));
const router = (0, express_1.Router)();
router.get("/", source_controller_1.default.getAllSources);
router.get("/:id", source_controller_1.default.getSourceById);
exports.default = router;
