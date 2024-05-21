import { Router, response } from "express";
import { ResponseBuilder } from "../types/response.type";

const responseBuilder = new ResponseBuilder();

const router = Router();

router.get("/", (req, res) => {
	res.json(responseBuilder.successWithoutData("Still Alive!"));
});

export default router;
