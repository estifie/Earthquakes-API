import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { DEFAULT_PAGE } from "../config/constants";
import { ERROR_MESSAGES } from "../config/errorMessages";
import earthquakeService from "../services/earthquake.service";
import { ResponseBuilder } from "../types/response.type";
import { calculatePagination, safeParseFloat } from "../utils";
const responseBuilder = new ResponseBuilder();

const getAllEarthquakes = async (req: Request, res: Response) => {
	try {
		const { page, limit } = calculatePagination(req.query.page as string, req.query.limit as string);

		const earthquakes = await earthquakeService.getEarthquakes(false, page, limit);

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

const getAllEarthquakesAdmin = async (req: Request, res: Response) => {
	try {
		const page = parseFloat(req.query.page as string) || DEFAULT_PAGE;
		const limit = parseFloat(req.query.limit as string) || 10;
		const earthquakes = await earthquakeService.getEarthquakes(true, page, limit);

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

const createEarthquake = async (req: Request, res: Response) => {
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

const deleteEarthquake = async (req: Request, res: Response) => {
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

const fetchEarthquakes = async (req: Request, res: Response) => {
	try {
		const forceUpdate = req.query.forceUpdate === "true";
		const soft = req.query.soft === "true";

		await earthquakeService.fetchEarthquakes(forceUpdate, soft);
		res.json(responseBuilder.successWithoutData("Earthquakes fetched successfully"));
	} catch (error: any) {
		res.status(500).json(responseBuilder.errorWithoutData(error.message));
	}
};

export default { getAllEarthquakes, createEarthquake, getAllEarthquakesAdmin, fetchEarthquakes, deleteEarthquake };
