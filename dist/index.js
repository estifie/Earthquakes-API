"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./logger"));
const scheduler_1 = require("./scheduler");
const general_route_1 = __importDefault(require("./src/routes/general.route"));
dotenv_1.default.config();
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/earthquake";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1", general_route_1.default);
mongoose_1.default
    .connect(MONGODB_URI)
    .then(() => {
    logger_1.default.info("Connected to MongoDB");
    (0, scheduler_1.initScheduler)();
})
    .catch((error) => {
    logger_1.default.error("Error connecting to MongoDB: " + error.message);
});
app.listen(PORT, () => {
    logger_1.default.info(`Server running on ${PORT}`);
});
exports.default = app;
