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
exports.fetchEarthquakes = exports.deleteEarthquake = exports.createEarthquake = exports.getLatestEarthquake = exports.getEarthquakes6Magnitude = exports.getEarthquakes4_5Magnitude = exports.getEarthquakes2_5Magnitude = exports.getEarthquakes24Hours = exports.getEarthquakes12Hours = exports.getEarthquakes4Hours = exports.getEarthquakes2Hours = exports.getEarthquakes1Hour = exports.getEarthquakes30Minutes = exports.getAllEarthquakes = exports.handleGetEarthquakes = exports.getEarthquakeByCode = void 0;
const express_validator_1 = require("express-validator");
const errorMessages_1 = require("../config/errorMessages");
const earthquake_service_1 = __importDefault(require("../services/earthquake.service"));
const response_type_1 = require("../types/response.type");
const utils_1 = require("../utils");
const responseBuilder = new response_type_1.ResponseBuilder();
const getEarthquakeByCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (0, express_validator_1.validationResult)(req);
        if (result.isEmpty()) {
            return res.status(400).json({ error: errorMessages_1.ERROR_MESSAGES.ERR_MISSING_FIELDS });
        }
        const code = req.params.code;
        const earthquake = yield earthquake_service_1.default.getEarthquakeByCode(code);
        res.json(responseBuilder.successWithoutMessage({
            earthquake,
        }));
    }
    catch (error) {
        res.status(500).json(responseBuilder.errorWithoutData(error.message));
    }
});
exports.getEarthquakeByCode = getEarthquakeByCode;
const handleGetEarthquakes = (req, res, time, magnitude) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (0, express_validator_1.validationResult)(req);
        if (result.isEmpty()) {
            return res.status(400).json({ error: errorMessages_1.ERROR_MESSAGES.ERR_MISSING_FIELDS });
        }
        const { page, limit } = (0, utils_1.calculatePagination)(req.query.page, req.query.limit);
        const { longitude, latitude, distance, unit, magType } = req.query;
        if ((latitude || longitude || distance || unit) && (!latitude || !longitude || !distance || !unit)) {
            return res.status(400).json({ error: errorMessages_1.ERROR_MESSAGES.ERR_MISSING_FIELDS });
        }
        const data = {
            showDeleted: false,
            page,
            limit,
            time: time || req.query.time,
            magnitude: magnitude || req.query.magnitude,
            longitude: longitude,
            latitude: latitude,
            distance: (0, utils_1.safeParseFloat)(distance),
            unit: unit,
            magType: magType,
        };
        const earthquakes = yield earthquake_service_1.default.getEarthquakes(data);
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
exports.handleGetEarthquakes = handleGetEarthquakes;
const getAllEarthquakes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (0, express_validator_1.validationResult)(req);
        if (result.isEmpty()) {
            return res.status(400).json({ error: errorMessages_1.ERROR_MESSAGES.ERR_MISSING_FIELDS });
        }
        const { time, magnitude } = req.query;
        yield (0, exports.handleGetEarthquakes)(req, res, time, magnitude);
    }
    catch (error) {
        res.status(500).json(responseBuilder.errorWithoutData(error.message));
    }
});
exports.getAllEarthquakes = getAllEarthquakes;
const getEarthquakes30Minutes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (0, express_validator_1.validationResult)(req);
        if (result.isEmpty()) {
            return res.status(400).json({ error: errorMessages_1.ERROR_MESSAGES.ERR_MISSING_FIELDS });
        }
        const { magnitude } = req.query;
        yield (0, exports.handleGetEarthquakes)(req, res, "30m", magnitude);
    }
    catch (error) {
        res.status(500).json(responseBuilder.errorWithoutData(error.message));
    }
});
exports.getEarthquakes30Minutes = getEarthquakes30Minutes;
const getEarthquakes1Hour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (0, express_validator_1.validationResult)(req);
        if (result.isEmpty()) {
            return res.status(400).json({ error: errorMessages_1.ERROR_MESSAGES.ERR_MISSING_FIELDS });
        }
        const { magnitude } = req.query;
        yield (0, exports.handleGetEarthquakes)(req, res, "1h", magnitude);
    }
    catch (error) {
        res.status(500).json(responseBuilder.errorWithoutData(error.message));
    }
});
exports.getEarthquakes1Hour = getEarthquakes1Hour;
const getEarthquakes2Hours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (0, express_validator_1.validationResult)(req);
        if (result.isEmpty()) {
            return res.status(400).json({ error: errorMessages_1.ERROR_MESSAGES.ERR_MISSING_FIELDS });
        }
        const { magnitude } = req.query;
        yield (0, exports.handleGetEarthquakes)(req, res, "2h", magnitude);
    }
    catch (error) {
        res.status(500).json(responseBuilder.errorWithoutData(error.message));
    }
});
exports.getEarthquakes2Hours = getEarthquakes2Hours;
const getEarthquakes4Hours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (0, express_validator_1.validationResult)(req);
        if (result.isEmpty()) {
            return res.status(400).json({ error: errorMessages_1.ERROR_MESSAGES.ERR_MISSING_FIELDS });
        }
        const { magnitude } = req.query;
        yield (0, exports.handleGetEarthquakes)(req, res, "4h", magnitude);
    }
    catch (error) {
        res.status(500).json(responseBuilder.errorWithoutData(error.message));
    }
});
exports.getEarthquakes4Hours = getEarthquakes4Hours;
const getEarthquakes12Hours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (0, express_validator_1.validationResult)(req);
        if (result.isEmpty()) {
            return res.status(400).json({ error: errorMessages_1.ERROR_MESSAGES.ERR_MISSING_FIELDS });
        }
        const { magnitude } = req.query;
        yield (0, exports.handleGetEarthquakes)(req, res, "12h", magnitude);
    }
    catch (error) {
        res.status(500).json(responseBuilder.errorWithoutData(error.message));
    }
});
exports.getEarthquakes12Hours = getEarthquakes12Hours;
const getEarthquakes24Hours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (0, express_validator_1.validationResult)(req);
        if (result.isEmpty()) {
            return res.status(400).json({ error: errorMessages_1.ERROR_MESSAGES.ERR_MISSING_FIELDS });
        }
        const { magnitude } = req.query;
        yield (0, exports.handleGetEarthquakes)(req, res, "24h", magnitude);
    }
    catch (error) {
        res.status(500).json(responseBuilder.errorWithoutData(error.message));
    }
});
exports.getEarthquakes24Hours = getEarthquakes24Hours;
const getEarthquakes2_5Magnitude = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (0, express_validator_1.validationResult)(req);
        if (result.isEmpty()) {
            return res.status(400).json({ error: errorMessages_1.ERROR_MESSAGES.ERR_MISSING_FIELDS });
        }
        const { time } = req.query;
        yield (0, exports.handleGetEarthquakes)(req, res, time, "2.5");
    }
    catch (error) {
        res.status(500).json(responseBuilder.errorWithoutData(error.message));
    }
});
exports.getEarthquakes2_5Magnitude = getEarthquakes2_5Magnitude;
const getEarthquakes4_5Magnitude = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (0, express_validator_1.validationResult)(req);
        if (result.isEmpty()) {
            return res.status(400).json({ error: errorMessages_1.ERROR_MESSAGES.ERR_MISSING_FIELDS });
        }
        const { time } = req.query;
        yield (0, exports.handleGetEarthquakes)(req, res, time, "4.5");
    }
    catch (error) {
        res.status(500).json(responseBuilder.errorWithoutData(error.message));
    }
});
exports.getEarthquakes4_5Magnitude = getEarthquakes4_5Magnitude;
const getEarthquakes6Magnitude = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (0, express_validator_1.validationResult)(req);
        if (result.isEmpty()) {
            return res.status(400).json({ error: errorMessages_1.ERROR_MESSAGES.ERR_MISSING_FIELDS });
        }
        const { time } = req.query;
        yield (0, exports.handleGetEarthquakes)(req, res, time, "6");
    }
    catch (error) {
        res.status(500).json(responseBuilder.errorWithoutData(error.message));
    }
});
exports.getEarthquakes6Magnitude = getEarthquakes6Magnitude;
const getLatestEarthquake = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const earthquake = yield earthquake_service_1.default.getLatestEarthquake();
        res.json(responseBuilder.successWithoutMessage({
            earthquake,
        }));
    }
    catch (error) {
        res.status(500).json(responseBuilder.errorWithoutData(error.message));
    }
});
exports.getLatestEarthquake = getLatestEarthquake;
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
exports.createEarthquake = createEarthquake;
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
exports.deleteEarthquake = deleteEarthquake;
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
exports.fetchEarthquakes = fetchEarthquakes;
