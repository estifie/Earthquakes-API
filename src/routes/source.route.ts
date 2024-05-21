import { Router } from "express";
import sourceController from "../controllers/source.controller";

const router = Router();
router.get("/", sourceController.getAllSources);
router.get("/:id", sourceController.getSourceById);

export default router;
