"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateApiKey = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const errorMessages_1 = require("../config/errorMessages");
dotenv_1.default.config();
const authenticateApiKey = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: errorMessages_1.ERROR_MESSAGES.UNAUTHORIZED });
    }
    next();
};
exports.authenticateApiKey = authenticateApiKey;
