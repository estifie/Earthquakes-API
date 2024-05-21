"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const response_type_1 = require("../types/response.type");
const responseBuilder = new response_type_1.ResponseBuilder();
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.json(responseBuilder.successWithoutData("Still Alive!"));
});
exports.default = router;
