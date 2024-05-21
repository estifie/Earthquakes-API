import axios from "axios";
import logger from "../../logger";
import { FEED_URL } from "../config/constants";
import { ERROR_MESSAGES } from "../config/errorMessages";
import Earthquake from "../models/earthquake.model";
import { Earthquake as EarthquakeType } from "../types";
import { EarthquakeProperties } from "../types/earthquake.type";
import { addressFindByLatLon, safeParseFloat } from "../utils";

const getEarthquakes = async (showDeleted: boolean, page: number, limit: number) => {
	try {
		const earthquakes = await Earthquake.find(showDeleted ? {} : { deleted: false })
			.sort({ "time.value": -1 })
			.skip((page - 1) * limit)
			.limit(limit);

		return earthquakes;
	} catch (error) {
		throw new Error(ERROR_MESSAGES.ERR_EARTHQUAKES_FETCH);
	}
};

const createEarthquake = async (data: EarthquakeType, forceUpdate: boolean) => {
	const earthquake = new Earthquake(data);

	try {
		const existing = await Earthquake.findOne({ code: data.code });
		if (existing) {
			if (forceUpdate) {
				existing.set(data);
				await existing.save();
				logger.info("Earthquake updated: " + data.code);
			}
			return existing;
		}

		const newEarthquake = await earthquake.save();
		return newEarthquake;
	} catch (error) {
		throw new Error(ERROR_MESSAGES.ERR_EARTHQUAKE_CREATE);
	}
};

const deleteEarthquake = async (id: string) => {
	try {
		const earthquake = await Earthquake.findById(id);
		if (!earthquake) {
			throw new Error(ERROR_MESSAGES.ERR_EARTHQUAKE_NOT_FOUND);
		}
		earthquake.deleted = true;
		await earthquake.save();
		return earthquake;
	} catch (error) {
		throw new Error(ERROR_MESSAGES.ERR_EARTHQUAKE_DELETE);
	}
};

const updateEarthquake = async (id: string, data: EarthquakeType) => {
	try {
		const earthquake = await Earthquake.findById(id);
		if (!earthquake) {
			throw new Error(ERROR_MESSAGES.ERR_EARTHQUAKE_NOT_FOUND);
		}
		earthquake.set(data);
		await earthquake.save();
		return earthquake;
	} catch (error) {
		throw new Error(ERROR_MESSAGES.ERR_EARTHQUAKE_UPDATE);
	}
};

const fetchEarthquakes = async (forceUpdate: boolean, soft: boolean) => {
	try {
		if (!soft) {
			await hardFetchEarthquakes(forceUpdate);
		} else {
			await softFetchEarthquakes(forceUpdate);
		}
	} catch (error) {
		throw new Error(ERROR_MESSAGES.ERR_EARTHQUAKES_FETCH);
	}
};

const softFetchEarthquakes = async (forceUpdate: boolean) => {
	const response = await axios.get(FEED_URL);

	if (response.status !== 200) {
		throw new Error(ERROR_MESSAGES.ERR_EARTHQUAKES_FETCH);
	}

	const latestEarthquakeCode: object = response.data["features"][0]["properties"]["code"];

	const existing = await Earthquake.findOne({ code: latestEarthquakeCode });

	if (existing) {
		logger.info("Earthquakes are up to date! Skipping fetch.");
		return;
	}

	const data: object = response.data["features"];

	parseEarthquakes(data, forceUpdate, true);
};

const hardFetchEarthquakes = async (forceUpdate: boolean) => {
	try {
		const response = await axios.get(FEED_URL);

		if (response.status !== 200) {
			throw new Error(ERROR_MESSAGES.ERR_EARTHQUAKES_FETCH);
		}

		const data: object = response.data["features"];

		parseEarthquakes(data, forceUpdate, false);
	} catch (error) {
		throw new Error(ERROR_MESSAGES.ERR_EARTHQUAKES_FETCH);
	}
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const parseEarthquakes = async (earthquakes: any, forceUpdate: boolean, soft: boolean) => {
	for (const earthquake of earthquakes) {
		try {
			// If earthquake's code exists in the database, stop all operations
			const existing = await Earthquake.findOne({ code: earthquake.properties.code });

			if (existing && soft) {
				logger.info("Earthquakes are up to date! Skipping fetch.");
				return;
			}

			await parseEarthquake(earthquake, forceUpdate);
		} catch (error) {
			continue;
		}
		await delay(1000);
	}
};

const parseEarthquake = async (earthquake: any, forceUpdate: boolean) => {
	const { properties, geometry }: { properties: EarthquakeProperties; geometry: any } = earthquake;
	const { coordinates } = geometry;

	logger.info("Parsing earthquake: " + properties.code);

	const detailedData = (await axios.get(properties.detail)).data;
	logger.info("Fetched detailed data for earthquake: " + properties.code);
	const otherDetails = detailedData ? detailedData["properties"]["products"]["origin"][0]["properties"] : {};

	const earthquakeData: EarthquakeType = {
		code: properties.code,
		location: properties.place,
		magnitude: {
			value: properties.mag,
			uncertainty: safeParseFloat(otherDetails["magnitude-error"]),
		},
		magType: properties.magType,
		time: {
			value: new Date(properties.time).toISOString(),
			uncertainty: safeParseFloat(otherDetails["eventtime-error"]),
		},
		source: properties.net,
		status: properties.status,
		coordinates: {
			latitude: {
				value: coordinates[1],
				uncertainty: safeParseFloat(otherDetails["latitude-error"]),
			},
			longitude: {
				value: coordinates[0],
				uncertainty: safeParseFloat(otherDetails["longitude-error"]),
			},
		},
		depth: {
			meters: {
				value: coordinates[2],
				uncertainty: safeParseFloat(otherDetails["vertical-error"]),
			},
		},
		numberOfStations: safeParseFloat(properties.nst),
		type: properties.type,
		tsunami: properties.tsunami === 1,
		placeInformation: await addressFindByLatLon(coordinates[1], coordinates[0]),
	};

	return createEarthquake(earthquakeData, forceUpdate);
};

export default {
	createEarthquake,
	deleteEarthquake,
	fetchEarthquakes,
	getEarthquakes,
	updateEarthquake,
	softFetchEarthquakes,
};
