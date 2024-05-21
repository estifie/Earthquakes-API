import { Router } from "express";
import earthquakeController from "../controllers/earthquake.controller";
import { authenticateApiKey, validateCreateEarthquake } from "../middlewares";

const router = Router();

/* GET all earthquakes */
router.get("/", earthquakeController.getAllEarthquakes);

// /* GET last 1h earthquakes */
// router.get("/1h", earthquakeController.getLastHourEarthquakes);

// /* GET last 24h earthquakes */
// router.get("/24h", earthquakeController.getLastDayEarthquakes);

// /* GET last 7d earthquakes */
// router.get("/7d", earthquakeController.getLastWeekEarthquakes);

// /* GET earthquakes above 2.5 magnitude */
// router.get("/m2.5", earthquakeController.getEarthquakesAbove2_5);

// /* GET earthquakes above 4.5 magnitude */
// router.get("/m4.5", earthquakeController.getEarthquakesAbove4_5);

// /* GET earthquakes above 6.0 magnitude */
// router.get("/m6.0", earthquakeController.getEarthquakesAbove6_0);

router.post("/", authenticateApiKey, validateCreateEarthquake, earthquakeController.createEarthquake);
router.get("/admin", authenticateApiKey, earthquakeController.getAllEarthquakesAdmin);
router.get("/admin/fetch", authenticateApiKey, earthquakeController.fetchEarthquakes);
router.delete("/:id", authenticateApiKey, earthquakeController.deleteEarthquake);

export default router;
