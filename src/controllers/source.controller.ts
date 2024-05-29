import express, { Request, Response, response } from "express";
import sourceService from "../services/source.service";
import { APIResponse } from "../types";
import { ResponseBuilder } from "../types/response.type";

const responseBuilder = new ResponseBuilder();

export const getAllSources = async (req: Request, res: Response) => {
	try {
		const sources = await sourceService.getAllSources();
		res.json(
			responseBuilder.successWithoutMessage({
				length: sources.length,
				sources,
			}),
		);
	} catch (error: any) {
		res.status(500).json(responseBuilder.errorWithoutData(error.message));
	}
};

export const getSourceById = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const source = await sourceService.getSourceById(id as string);
		res.json(
			responseBuilder.successWithoutMessage({
				id,
				source,
			}),
		);
	} catch (error: any) {
		res.status(500).json(responseBuilder.errorWithoutData(error.message));
	}
};
