"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseBuilder = exports.ResponseBuilder = void 0;
class ResponseBuilder {
    constructor() {
        this.build = (status, data, message) => {
            return {
                status,
                data,
                message,
                timestamp: Date.now(),
            };
        };
        this.success = (data, message) => {
            return this.build("success", data, message);
        };
        this.successWithoutMessage = (data) => {
            return this.build("success", data, undefined);
        };
        this.successWithoutData = (message) => {
            return this.build("success", null, message);
        };
        this.error = (data, message) => {
            return this.build("error", data, message);
        };
        this.errorWithoutData = (message) => {
            return this.build("error", null, message);
        };
    }
}
exports.ResponseBuilder = ResponseBuilder;
const responseBuilder = (status, data, message) => {
    return {
        status,
        data,
        message,
        timestamp: Date.now(),
    };
};
exports.responseBuilder = responseBuilder;
