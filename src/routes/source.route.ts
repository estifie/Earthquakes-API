import { Router } from "express";
import * as controller from "../controllers/source.controller";

const router = Router();
router.get("/", controller.getAllSources);
router.get("/:id", controller.getSourceById);

export default router;
