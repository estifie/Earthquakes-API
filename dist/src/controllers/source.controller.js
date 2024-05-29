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
exports.getSourceById = exports.getAllSources = void 0;
const source_service_1 = __importDefault(require("../services/source.service"));
const response_type_1 = require("../types/response.type");
const responseBuilder = new response_type_1.ResponseBuilder();
const getAllSources = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sources = yield source_service_1.default.getAllSources();
        res.json(responseBuilder.successWithoutMessage({
            length: sources.length,
            sources,
        }));
    }
    catch (error) {
        res.status(500).json(responseBuilder.errorWithoutData(error.message));
    }
});
exports.getAllSources = getAllSources;
const getSourceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const source = yield source_service_1.default.getSourceById(id);
        res.json(responseBuilder.successWithoutMessage({
            id,
            source,
        }));
    }
    catch (error) {
        res.status(500).json(responseBuilder.errorWithoutData(error.message));
    }
});
exports.getSourceById = getSourceById;
