import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { ERROR_MESSAGES } from "../config/errorMessages";
dotenv.config();

export const authenticateApiKey = (req: Request, res: Response, next: NextFunction) => {
	const apiKey = req.headers["x-api-key"];

	if (!apiKey || apiKey !== process.env.API_KEY) {
		return res.status(401).json({ error: ERROR_MESSAGES.UNAUTHORIZED });
	}

	next();
};
