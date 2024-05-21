"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateEarthquake = exports.authenticateApiKey = void 0;
var authentication_middleware_1 = require("./authentication.middleware");
Object.defineProperty(exports, "authenticateApiKey", { enumerable: true, get: function () { return authentication_middleware_1.authenticateApiKey; } });
var validator_middleware_1 = require("./validator.middleware");
Object.defineProperty(exports, "validateCreateEarthquake", { enumerable: true, get: function () { return validator_middleware_1.validateCreateEarthquake; } });
