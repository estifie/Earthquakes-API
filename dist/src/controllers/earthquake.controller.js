"use strict";
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
const express_validator_1 = require("express-validator");
const constants_1 = require("../config/constants");
const errorMessages_1 = require("../config/errorMessages");
const earthquake_service_1 = __importDefault(require("../services/earthquake.service"));
const response_type_1 = require("../types/response.type");
const utils_1 = require("../utils");
const responseBuilder = new response_type_1.ResponseBuilder();
const getAllEarthquakes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit } = (0, utils_1.calculatePagination)(req.query.page, req.query.limit);
        const earthquakes = yield earthquake_service_1.default.getEarthquakes(false, page, limit);
        res.json(responseBuilder.successWithoutMessage({
            page,
            length: earthquakes.length,
            earthquakes,
        }));
    }
    catch (error) {
        res.status(500).json(responseBuilder.errorWithoutData(error.message));
    }
});
const getAllEarthquakesAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseFloat(req.query.page) || constants_1.DEFAULT_PAGE;
        const limit = parseFloat(req.query.limit) || 10;
        const earthquakes = yield earthquake_service_1.default.getEarthquakes(true, page, limit);
        res.json(responseBuilder.successWithoutMessage({
            page,
            length: earthquakes.length,
            earthquakes,
        }));
    }
    catch (error) {
        res.status(500).json(responseBuilder.errorWithoutData(error.message));
    }
});
const createEarthquake = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(req);
    if (result.isEmpty()) {
        return res.status(400).json({ error: errorMessages_1.ERROR_MESSAGES.ERR_MISSING_FIELDS });
    }
    const data = req.body;
    try {
        const newEarthquake = yield earthquake_service_1.default.createEarthquake(data, false);
        res.json(responseBuilder.successWithoutMessage({
            earthquake: newEarthquake,
        }));
    }
    catch (error) {
        res.status(500).json(responseBuilder.errorWithoutData(error.message));
    }
});
const deleteEarthquake = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedEarthquake = yield earthquake_service_1.default.deleteEarthquake(id);
        res.json(responseBuilder.successWithoutMessage({
            earthquake: deletedEarthquake,
        }));
    }
    catch (error) {
        res.status(500).json(responseBuilder.errorWithoutData(error.message));
    }
});
const fetchEarthquakes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const forceUpdate = req.query.forceUpdate === "true";
        const soft = req.query.soft === "true";
        yield earthquake_service_1.default.fetchEarthquakes(forceUpdate, soft);
        res.json(responseBuilder.successWithoutData("Earthquakes fetched successfully"));
    }
    catch (error) {
        res.status(500).json(responseBuilder.errorWithoutData(error.message));
    }
});
exports.default = { getAllEarthquakes, createEarthquake, getAllEarthquakesAdmin, fetchEarthquakes, deleteEarthquake };
