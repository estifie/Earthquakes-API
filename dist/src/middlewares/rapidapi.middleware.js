"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateRapidAPI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authenticateRapidAPI = (req, res, next) => {
    console.log(req.headers);
    const rapidApiKey = req.headers["x-rapidapi-proxy-secret"];
    if (!rapidApiKey || rapidApiKey !== process.env.RAPID_API_KEY) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
};
exports.authenticateRapidAPI = authenticateRapidAPI;
