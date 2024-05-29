import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
dotenv.config();

export const authenticateRapidAPI = (req: Request, res: Response, next: NextFunction) => {
	console.log(req.headers);

	const rapidApiKey = req.headers["x-rapidapi-proxy-secret"];

	if (!rapidApiKey || rapidApiKey !== process.env.RAPID_API_KEY) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	next();
};
