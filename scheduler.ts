// This file contains scheduled tasks that are run at specific intervals

import cron from "node-cron";
import logger from "./logger";
import { FETCH_INTERVAL_CRON, INITIAL_FETCH, INITIAL_FETCH_DELAY } from "./src/config/constants";
import earthquakeService from "./src/services/earthquake.service";

const fetchEarthquakesScheduler = async () => {
	if (INITIAL_FETCH) {
		logger.info("Fetching earthquakes for the first time");
		await earthquakeService.fetchEarthquakes(true, false);
		await new Promise((resolve) => setTimeout(resolve, INITIAL_FETCH_DELAY));
	}

	cron.schedule(FETCH_INTERVAL_CRON, async () => {
		logger.info("Fetching earthquakes every 10 seconds");
		await earthquakeService.fetchEarthquakes(false, true);
	});
};

export const initScheduler = async () => {
	await fetchEarthquakesScheduler();
};
