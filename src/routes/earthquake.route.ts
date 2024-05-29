import { Router } from "express";
import * as controller from "../controllers/earthquake.controller";
import { authenticateApiKey, validator } from "../middlewares";

const router = Router();

/* GET all earthquakes */
router.get("/", validator.validateGetAllEarthquakes, controller.getAllEarthquakes);

/* GET earthquake by code */
router.get("/:code/details", validator.validateGetEarthquakeByCode, controller.getEarthquakeByCode);

/* GET last 30m earthquakes */
router.get("/30m", validator.validateGetEarthquakesWithTime, controller.getEarthquakes30Minutes);

/* GET last 1h earthquakes */
router.get("/1h", validator.validateGetEarthquakesWithTime, controller.getEarthquakes1Hour);

/* GET last 2h earthquakes */
router.get("/2h", validator.validateGetEarthquakesWithTime, controller.getEarthquakes2Hours);

/* GET last 4h earthquakes */
router.get("/4h", validator.validateGetEarthquakesWithTime, controller.getEarthquakes4Hours);

/* GET last 12h earthquakes */
router.get("/12h", validator.validateGetEarthquakesWithTime, controller.getEarthquakes12Hours);

/* GET last 24h earthquakes */
router.get("/24h", validator.validateGetEarthquakesWithTime, controller.getEarthquakes24Hours);

/* GET earthquakes above 2.5 magnitude */
router.get("/m2.5", validator.validateGetEarthquakesWithMagnitude, controller.getEarthquakes2_5Magnitude);

/* GET earthquakes above 4.5 magnitude */
router.get("/m4.5", validator.validateGetEarthquakesWithMagnitude, controller.getEarthquakes4_5Magnitude);

/* GET earthquakes above 6.0 magnitude */
router.get("/m6", validator.validateGetEarthquakesWithMagnitude, controller.getEarthquakes6Magnitude);

/* GET Latest earthquake */
router.get("/latest", controller.getLatestEarthquake);

/* POST Create a new earthquake */
router.post("/", authenticateApiKey, validator.validateCreateEarthquake, controller.createEarthquake);

/* GET Fetch earthquakes from external API */
router.get("/admin/fetch", authenticateApiKey, validator.validateFetchEarthquakes, controller.fetchEarthquakes);

/* DELETE Delete an earthquake by id */
router.delete("/:id", authenticateApiKey, validator.validateDeleteEarthquake, controller.deleteEarthquake);

export default router;
