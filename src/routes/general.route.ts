import { Router } from "express";

import earthquakeRouter from "./earthquake.route";
import healthRouter from "./health.route";
import sourceRouter from "./source.route";

const router = Router();

router.use("/earthquakes", earthquakeRouter);
router.use("/health", healthRouter);
router.use("/sources", sourceRouter);

export default router;
