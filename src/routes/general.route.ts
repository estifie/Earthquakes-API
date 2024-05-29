import { Router } from "express";

import { authenticateRapidAPI } from "../middlewares";
import earthquakeRouter from "./earthquake.route";
import healthRouter from "./health.route";
import sourceRouter from "./source.route";

const router = Router();

router.use("/earthquakes", authenticateRapidAPI, earthquakeRouter);
router.use("/ping", healthRouter);
router.use("/sources", authenticateRapidAPI, sourceRouter);

export default router;
