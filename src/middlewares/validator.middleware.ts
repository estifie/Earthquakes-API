import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";

export const validateCreateEarthquake = [
	body("magnitude").notEmpty().isNumeric(),
	body("location").notEmpty().isString(),
	body("time").notEmpty().isString(),
	body("coordinates").notEmpty().isObject(),
	body("coordinates.latitude").notEmpty().isObject(),
	body("coordinates.latitude.value").notEmpty().isNumeric(),
	body("coordinates.latitude.direction").notEmpty().isString(),
	body("coordinates.longitude").notEmpty().isObject(),
	body("coordinates.longitude.value").notEmpty().isNumeric(),
	body("coordinates.longitude.direction").notEmpty().isString(),
	body("depth").notEmpty().isObject(),
	body("depth.metres").optional().isNumeric(),
	body("depth.miles").optional().isNumeric(),
];
