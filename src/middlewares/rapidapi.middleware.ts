import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
dotenv.config();

const RAPID_API_KEY = process.env.RAPID_API_KEY;

export const authenticateRapidAPI = (req: Request, res: Response, next: NextFunction) => {
	if (!RAPID_API_KEY) {
		next();

		return;
	}

	const rapidApiKey = req.headers["x-rapidapi-proxy-secret"];

	if (!rapidApiKey || rapidApiKey !== process.env.RAPID_API_KEY) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	next();
};
