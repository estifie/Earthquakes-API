"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateEarthquake = void 0;
const express_validator_1 = require("express-validator");
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
