// This file contains scheduled tasks that are run at specific intervals

import cron from "node-cron";
import logger from "./logger";
import { SCHEDULER } from "./src/config/constants";
import earthquakeService from "./src/services/earthquake.service";

const fetchEarthquakesScheduler = async () => {
	if (SCHEDULER.INITIAL_FETCH) {
		logger.info("Fetching earthquakes for the first time");
		await earthquakeService.fetchEarthquakes(true, false);
		await new Promise((resolve) => setTimeout(resolve, SCHEDULER.INITIAL_FETCH_DELAY));
	}

	cron.schedule(SCHEDULER.FETCH_INTERVAL_CRON, async () => {
		logger.info("Fetching earthquakes every 10 seconds");
		await earthquakeService.fetchEarthquakes(false, true);
	});
};

export const initScheduler = async () => {
	SCHEDULER.FETCH ? await fetchEarthquakesScheduler() : logger.info("Earthquake Fetch Scheduler is disabled");
};
