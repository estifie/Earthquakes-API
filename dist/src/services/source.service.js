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
Object.defineProperty(exports, "__esModule", { value: true });
const sources_1 = require("../config/sources");
const getAllSources = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return sources_1.SOURCES;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const getSourceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const source = sources_1.SOURCES[id];
        if (!source) {
            throw new Error("Source not found");
        }
        return source;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.default = { getAllSources, getSourceById };
