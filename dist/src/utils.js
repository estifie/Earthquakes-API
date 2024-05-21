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
exports.calculatePagination = exports.addressFindByLatLon = exports.safeParseFloat = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("./config/constants");
const safeParseFloat = (value) => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? null : parsed;
};
exports.safeParseFloat = safeParseFloat;
const addressFindByLatLon = (lat, lon) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lon}&zoom=18&format=jsonv2`, {
            headers: {
                "Accept-Language": "en-US,en;q=0.5",
            },
        });
        if (response.status !== 200 || response.data.error) {
            return null;
        }
        const { name, display_name, address, boundingbox } = response.data;
        return {
            name: name === "" ? display_name : name,
            fullName: display_name,
            latitude: lat,
            longitude: lon,
            country: address.country,
            countryCode: address.country_code,
            postCode: address.postcode,
            state: address.state,
            stateDistrict: address.state_district,
            village: address.village,
            region: address.region,
            province: address.province,
            county: address.county,
            town: address.town,
            suburb: address.suburb,
            boundingbox,
        };
    }
    catch (error) {
        return null;
    }
});
exports.addressFindByLatLon = addressFindByLatLon;
const calculatePagination = (desiredPage, desiredLimit) => {
    const page = Math.max((0, exports.safeParseFloat)(desiredPage) || constants_1.DEFAULT_PAGE, constants_1.DEFAULT_PAGE);
    const limit = Math.min((0, exports.safeParseFloat)(desiredLimit) || constants_1.DEFAULT_LIMIT, constants_1.MAXIMUM_LIMIT);
    return {
        page,
        limit,
    };
};
exports.calculatePagination = calculatePagination;
