import { Router } from "express";
import earthquakeController from "../controllers/earthquake.controller";
import { authenticateApiKey, validateCreateEarthquake } from "../middlewares";

const router = Router();

/* GET all earthquakes */
router.get("/", earthquakeController.getAllEarthquakes);

/* GET earthquake by code */
router.get("/:code/details", earthquakeController.getEarthquakeByCode);

/* GET last 30m earthquakes */
router.get("/30m", earthquakeController.getEarthquakes30Minutes);

/* GET last 1h earthquakes */
router.get("/1h", earthquakeController.getEarthquakes1Hour);

/* GET last 2h earthquakes */
router.get("/2h", earthquakeController.getEarthquakes2Hours);

/* GET last 4h earthquakes */
router.get("/4h", earthquakeController.getEarthquakes4Hours);

/* GET last 12h earthquakes */
router.get("/12h", earthquakeController.getEarthquakes12Hours);

/* GET last 24h earthquakes */
router.get("/24h", earthquakeController.getEarthquakes24Hours);

/* GET earthquakes above 2.5 magnitude */
router.get("/m2.5", earthquakeController.getEarthquakes2_5Magnitude);

/* GET earthquakes above 4.5 magnitude */
router.get("/m4.5", earthquakeController.getEarthquakes4_5Magnitude);

/* GET earthquakes above 6.0 magnitude */
router.get("/m6", earthquakeController.getEarthquakes6Magnitude);

/* GET Latest earthquake */
router.get("/latest", earthquakeController.getLatestEarthquake);

/* POST Create a new earthquake */
router.post("/", authenticateApiKey, validateCreateEarthquake, earthquakeController.createEarthquake);

/* GET Fetch earthquakes from external API */
router.get("/admin/fetch", authenticateApiKey, earthquakeController.fetchEarthquakes);

/* DELETE Delete an earthquake by id */
router.delete("/:id", authenticateApiKey, earthquakeController.deleteEarthquake);

export default router;
