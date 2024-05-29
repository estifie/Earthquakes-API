import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { DEFAULT_PAGE } from "../config/constants";
import { ERROR_MESSAGES } from "../config/errorMessages";
import { EarthquakeParamsDto } from "../dto";
import earthquakeService from "../services/earthquake.service";
import { ResponseBuilder } from "../types/response.type";
import { Time } from "../types/time.type";
import { calculatePagination, safeParseFloat } from "../utils";
const responseBuilder = new ResponseBuilder();

export const getEarthquakeByCode = async (req: Request, res: Response) => {
	try {
		const result = validationResult(req);
		if (result.isEmpty()) {
			return res.status(400).json({ error: ERROR_MESSAGES.ERR_MISSING_FIELDS });
		}

		const code = req.params.code;
		const earthquake = await earthquakeService.getEarthquakeByCode(code);

		res.json(
			responseBuilder.successWithoutMessage({
				earthquake,
			}),
		);
	} catch (error: any) {
		res.status(500).json(responseBuilder.errorWithoutData(error.message));
	}
};

export const handleGetEarthquakes = async (req: Request, res: Response, time?: Time, magnitude?: string) => {
	try {
		const result = validationResult(req);
		if (result.isEmpty()) {
			return res.status(400).json({ error: ERROR_MESSAGES.ERR_MISSING_FIELDS });
		}

		const { page, limit } = calculatePagination(req.query.page as string, req.query.limit as string);
		const { longitude, latitude, distance, unit, magType } = req.query;

		if ((latitude || longitude || distance || unit) && (!latitude || !longitude || !distance || !unit)) {
			return res.status(400).json({ error: ERROR_MESSAGES.ERR_MISSING_FIELDS });
		}

		const data: EarthquakeParamsDto = {
			showDeleted: false,
			page,
			limit,
			time: time || (req.query.time as string),
			magnitude: magnitude || (req.query.magnitude as string),
			longitude: longitude as string,
			latitude: latitude as string,
			distance: safeParseFloat(distance as string),
			unit: unit as string,
			magType: magType as string,
		};

		const earthquakes = await earthquakeService.getEarthquakes(data);

		res.json(
			responseBuilder.successWithoutMessage({
				page,
				length: earthquakes.length,
				earthquakes,
			}),
		);
	} catch (error: any) {
		res.status(500).json(responseBuilder.errorWithoutData(error.message));
	}
};

export const getAllEarthquakes = async (req: Request, res: Response) => {
	try {
		const result = validationResult(req);
		if (result.isEmpty()) {
			return res.status(400).json({ error: ERROR_MESSAGES.ERR_MISSING_FIELDS });
		}

		const { time, magnitude } = req.query;
		await handleGetEarthquakes(req, res, time as Time, magnitude as string);
	} catch (error: any) {
		res.status(500).json(responseBuilder.errorWithoutData(error.message));
	}
};

export const getEarthquakes30Minutes = async (req: Request, res: Response) => {
	try {
		const result = validationResult(req);
		if (result.isEmpty()) {
			return res.status(400).json({ error: ERROR_MESSAGES.ERR_MISSING_FIELDS });
		}

		const { magnitude } = req.query;
		await handleGetEarthquakes(req, res, "30m", magnitude as string);
	} catch (error: any) {
		res.status(500).json(responseBuilder.errorWithoutData(error.message));
	}
};

export const getEarthquakes1Hour = async (req: Request, res: Response) => {
	try {
		const result = validationResult(req);
		if (result.isEmpty()) {
			return res.status(400).json({ error: ERROR_MESSAGES.ERR_MISSING_FIELDS });
		}

		const { magnitude } = req.query;
		await handleGetEarthquakes(req, res, "1h", magnitude as string);
	} catch (error: any) {
		res.status(500).json(responseBuilder.errorWithoutData(error.message));
	}
};

export const getEarthquakes2Hours = async (req: Request, res: Response) => {
	try {
		const result = validationResult(req);
		if (result.isEmpty()) {
			return res.status(400).json({ error: ERROR_MESSAGES.ERR_MISSING_FIELDS });
		}

		const { magnitude } = req.query;
		await handleGetEarthquakes(req, res, "2h", magnitude as string);
	} catch (error: any) {
		res.status(500).json(responseBuilder.errorWithoutData(error.message));
	}
};

export const getEarthquakes4Hours = async (req: Request, res: Response) => {
	try {
		const result = validationResult(req);
		if (result.isEmpty()) {
			return res.status(400).json({ error: ERROR_MESSAGES.ERR_MISSING_FIELDS });
		}

		const { magnitude } = req.query;
		await handleGetEarthquakes(req, res, "4h", magnitude as string);
	} catch (error: any) {
		res.status(500).json(responseBuilder.errorWithoutData(error.message));
	}
};

export const getEarthquakes12Hours = async (req: Request, res: Response) => {
	try {
		const result = validationResult(req);
		if (result.isEmpty()) {
			return res.status(400).json({ error: ERROR_MESSAGES.ERR_MISSING_FIELDS });
		}

		const { magnitude } = req.query;
		await handleGetEarthquakes(req, res, "12h", magnitude as string);
	} catch (error: any) {
		res.status(500).json(responseBuilder.errorWithoutData(error.message));
	}
};

export const getEarthquakes24Hours = async (req: Request, res: Response) => {
	try {
		const result = validationResult(req);
		if (result.isEmpty()) {
			return res.status(400).json({ error: ERROR_MESSAGES.ERR_MISSING_FIELDS });
		}

		const { magnitude } = req.query;
		await handleGetEarthquakes(req, res, "24h", magnitude as string);
	} catch (error: any) {
		res.status(500).json(responseBuilder.errorWithoutData(error.message));
	}
};

export const getEarthquakes2_5Magnitude = async (req: Request, res: Response) => {
	try {
		const result = validationResult(req);
		if (result.isEmpty()) {
			return res.status(400).json({ error: ERROR_MESSAGES.ERR_MISSING_FIELDS });
		}

		const { time } = req.query;
		await handleGetEarthquakes(req, res, time as Time, "2.5");
	} catch (error: any) {
		res.status(500).json(responseBuilder.errorWithoutData(error.message));
	}
};

export const getEarthquakes4_5Magnitude = async (req: Request, res: Response) => {
	try {
		const result = validationResult(req);
		if (result.isEmpty()) {
			return res.status(400).json({ error: ERROR_MESSAGES.ERR_MISSING_FIELDS });
		}

		const { time } = req.query;
		await handleGetEarthquakes(req, res, time as Time, "4.5");
	} catch (error: any) {
		res.status(500).json(responseBuilder.errorWithoutData(error.message));
	}
};

export const getEarthquakes6Magnitude = async (req: Request, res: Response) => {
	try {
		const result = validationResult(req);
		if (result.isEmpty()) {
			return res.status(400).json({ error: ERROR_MESSAGES.ERR_MISSING_FIELDS });
		}

		const { time } = req.query;
		await handleGetEarthquakes(req, res, time as Time, "6");
	} catch (error: any) {
		res.status(500).json(responseBuilder.errorWithoutData(error.message));
	}
};

export const getLatestEarthquake = async (req: Request, res: Response) => {
	try {
		const earthquake = await earthquakeService.getLatestEarthquake();
		res.json(
			responseBuilder.successWithoutMessage({
				earthquake,
			}),
		);
	} catch (error: any) {
		res.status(500).json(responseBuilder.errorWithoutData(error.message));
	}
};

export const createEarthquake = async (req: Request, res: Response) => {
	const result = validationResult(req);
	if (result.isEmpty()) {
		return res.status(400).json({ error: ERROR_MESSAGES.ERR_MISSING_FIELDS });
	}

	const data = req.body;
	try {
		const newEarthquake = await earthquakeService.createEarthquake(data, false);
		res.json(
			responseBuilder.successWithoutMessage({
				earthquake: newEarthquake,
			}),
		);
	} catch (error: any) {
		res.status(500).json(responseBuilder.errorWithoutData(error.message));
	}
};

export const deleteEarthquake = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const deletedEarthquake = await earthquakeService.deleteEarthquake(id);
		res.json(
			responseBuilder.successWithoutMessage({
				earthquake: deletedEarthquake,
			}),
		);
	} catch (error: any) {
		res.status(500).json(responseBuilder.errorWithoutData(error.message));
	}
};
export const fetchEarthquakes = async (req: Request, res: Response) => {
	try {
		const forceUpdate = req.query.forceUpdate === "true";
		const soft = req.query.soft === "true";
		await earthquakeService.fetchEarthquakes(forceUpdate, soft);
		res.json(responseBuilder.successWithoutData("Earthquakes fetched successfully"));
	} catch (error: any) {
		res.status(500).json(responseBuilder.errorWithoutData(error.message));
	}
};
