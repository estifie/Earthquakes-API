import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import logger from "./logger";
import { initScheduler } from "./scheduler";
import generalRouter from "./src/routes/general.route";
dotenv.config();

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/earthquake";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", generalRouter);

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		logger.info("Connected to MongoDB");

		initScheduler();
	})
	.catch((error) => {
		logger.error("Error connecting to MongoDB: " + error.message);
	});

app.listen(PORT, () => {
	logger.info(`Server running on ${PORT}`);
});

export default app;
