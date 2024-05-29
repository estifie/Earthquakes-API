"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGetEarthquakesWithMagnitude = exports.validateGetEarthquakesWithTime = exports.validateGetAllEarthquakes = exports.validateGetEarthquakeByCode = exports.validateDeleteEarthquake = exports.validateFetchEarthquakes = exports.validateCreateEarthquake = void 0;
const express_validator_1 = require("express-validator");
/* Create Earthquake Validator */
exports.validateCreateEarthquake = [
    (0, express_validator_1.body)("magnitude").notEmpty().isNumeric(),
    (0, express_validator_1.body)("location").notEmpty().isString(),
    (0, express_validator_1.body)("time").notEmpty().isString(),
    (0, express_validator_1.body)("coordinates").notEmpty().isObject(),
    (0, express_validator_1.body)("coordinates.latitude").notEmpty().isObject(),
    (0, express_validator_1.body)("coordinates.latitude.value").notEmpty().isNumeric(),
    (0, express_validator_1.body)("coordinates.latitude.direction").notEmpty().isString(),
    (0, express_validator_1.body)("coordinates.longitude").notEmpty().isObject(),
    (0, express_validator_1.body)("coordinates.longitude.value").notEmpty().isNumeric(),
    (0, express_validator_1.body)("coordinates.longitude.direction").notEmpty().isString(),
    (0, express_validator_1.body)("depth").notEmpty().isObject(),
    (0, express_validator_1.body)("depth.metres").optional().isNumeric(),
    (0, express_validator_1.body)("depth.miles").optional().isNumeric(),
];
/* Fetch Earthquakes As Admin Validator */
exports.validateFetchEarthquakes = [
    (0, express_validator_1.query)("forceUpdate").optional().isBoolean(),
    (0, express_validator_1.query)("soft").optional().isBoolean(),
];
/* Delete Earthquake Validator */
exports.validateDeleteEarthquake = [(0, express_validator_1.query)("code", "Code must be included").notEmpty().isString()];
/* Get Earthquake By Code Validator */
exports.validateGetEarthquakeByCode = [(0, express_validator_1.query)("code", "Code must be included").notEmpty().isString()];
/* Get All Earthquakes Validator */
// also write error messages
exports.validateGetAllEarthquakes = [
    (0, express_validator_1.query)("page", "Page must be a number").optional().isNumeric(),
    (0, express_validator_1.query)("limit", "Limit must be a number").optional().isNumeric(),
    (0, express_validator_1.query)("time", "Time must be a string, i.e. 1h").optional().isString(),
    (0, express_validator_1.query)("magnitude", "Magnitude must be a number, i.e. 3").optional().isNumeric(),
    (0, express_validator_1.query)("longitude", "Longitude must be a string").optional().isString(),
    (0, express_validator_1.query)("latitude", "Latitude must be a string").optional().isString(),
    (0, express_validator_1.query)("distance", "Distance must be a number").optional().isInt(),
    (0, express_validator_1.query)("unit", "Unit musgt be one of the following: m, km, ft, yd, mi")
        .optional()
        .isString()
        .isIn([
        "km",
        "kilometer",
        "kilometers",
        "miles",
        "mile",
        "mi",
        "meters",
        "m",
        "meter",
        "yard",
        "yards",
        "yd",
        "ft",
        "feet",
    ]),
];
/* Get Earthquakes With Selected Time Validator */
exports.validateGetEarthquakesWithTime = [
    (0, express_validator_1.query)("page").optional().isNumeric(),
    (0, express_validator_1.query)("limit").optional().isNumeric(),
    (0, express_validator_1.query)("magnitude").optional().isString(),
    (0, express_validator_1.query)("longitude").optional().isString(),
    (0, express_validator_1.query)("latitude").optional().isString(),
    (0, express_validator_1.query)("distance").optional().isInt(),
    (0, express_validator_1.query)("unit")
        .optional()
        .isString()
        .isIn([
        "km",
        "kilometer",
        "kilometers",
        "miles",
        "mile",
        "mi",
        "meters",
        "m",
        "meter",
        "yard",
        "yards",
        "yd",
        "ft",
        "feet",
    ]),
];
/* Get Earthquakes With Selected Magnitude Validator */
exports.validateGetEarthquakesWithMagnitude = [
    (0, express_validator_1.query)("page").optional().isNumeric(),
    (0, express_validator_1.query)("limit").optional().isNumeric(),
    (0, express_validator_1.query)("time").optional().isString(),
    (0, express_validator_1.query)("longitude").optional().isString(),
    (0, express_validator_1.query)("latitude").optional().isString(),
    (0, express_validator_1.query)("distance").optional().isInt(),
    (0, express_validator_1.query)("unit")
        .optional()
        .isString()
        .isIn([
        "km",
        "kilometer",
        "kilometers",
        "miles",
        "mile",
        "mi",
        "meters",
        "m",
        "meter",
        "yard",
        "yards",
        "yd",
        "ft",
        "feet",
    ]),
];
