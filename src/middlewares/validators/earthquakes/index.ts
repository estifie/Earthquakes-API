import { NextFunction, Request, Response } from "express";
import { body, query } from "express-validator";

/* Create Earthquake Validator */
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

/* Fetch Earthquakes As Admin Validator */
export const validateFetchEarthquakes = [
	query("forceUpdate").optional().isBoolean(),
	query("soft").optional().isBoolean(),
];

/* Delete Earthquake Validator */
export const validateDeleteEarthquake = [query("id").notEmpty().isString()];

/* Get Earthquake By Code Validator */
export const validateGetEarthquakeByCode = [query("code").notEmpty().isString()];

/* Get All Earthquakes Validator */
export const validateGetAllEarthquakes = [
	query("page").optional().isNumeric(),
	query("limit").optional().isNumeric(),
	query("time").optional().isString(),
	query("magnitude").optional().isString(),
	query("longitude").optional().isString(),
	query("latitude").optional().isString(),
	query("distance").optional().isInt(),
	query("unit")
		.optional()
		.isString()
		.isIn([
			"km",
			"kilometer",
			"kilometers",
			"miles",
			"mile",
			"mi",
			"meters",
			"m",
			"meter",
			"yard",
			"yards",
			"yd",
			"ft",
			"feet",
		]),
];

/* Get Earthquakes With Selected Time Validator */
export const validateGetEarthquakesWithTime = [
	query("page").optional().isNumeric(),
	query("limit").optional().isNumeric(),
	query("magnitude").optional().isString(),
	query("longitude").optional().isString(),
	query("latitude").optional().isString(),
	query("distance").optional().isInt(),
	query("unit")
		.optional()
		.isString()
		.isIn([
			"km",
			"kilometer",
			"kilometers",
			"miles",
			"mile",
			"mi",
			"meters",
			"m",
			"meter",
			"yard",
			"yards",
			"yd",
			"ft",
			"feet",
		]),
];

/* Get Earthquakes With Selected Magnitude Validator */
export const validateGetEarthquakesWithMagnitude = [
	query("page").optional().isNumeric(),
	query("limit").optional().isNumeric(),
	query("time").optional().isString(),
	query("longitude").optional().isString(),
	query("latitude").optional().isString(),
	query("distance").optional().isInt(),
	query("unit")
		.optional()
		.isString()
		.isIn([
			"km",
			"kilometer",
			"kilometers",
			"miles",
			"mile",
			"mi",
			"meters",
			"m",
			"meter",
			"yard",
			"yards",
			"yd",
			"ft",
			"feet",
		]),
];
