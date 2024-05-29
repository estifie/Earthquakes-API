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
export const validateDeleteEarthquake = [query("code", "Code must be included").notEmpty().isString()];

/* Get Earthquake By Code Validator */
export const validateGetEarthquakeByCode = [query("code", "Code must be included").notEmpty().isString()];

/* Get All Earthquakes Validator */
// also write error messages
export const validateGetAllEarthquakes = [
	query("page", "Page must be a number").optional().isNumeric(),
	query("limit", "Limit must be a number").optional().isNumeric(),
	query("time", "Time must be a string, i.e. 1h").optional().isString(),
	query("magnitude", "Magnitude must be a number, i.e. 3").optional().isNumeric(),
	query("longitude", "Longitude must be a string").optional().isString(),
	query("latitude", "Latitude must be a string").optional().isString(),
	query("distance", "Distance must be a number").optional().isInt(),
	query("unit", "Unit musgt be one of the following: m, km, ft, yd, mi")
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
