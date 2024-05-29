export const FEED_BASE = "https://earthquake.usgs.gov";
export const FEED_PATH = "/earthquakes/feed/v1.0/summary/all_day.geojson";
export const FEED_URL = `${FEED_BASE}${FEED_PATH}`;
export const DETAILED_URL = `${FEED_BASE}/earthquakes/feed/v1.0/detail/`;
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 30;
export const MAXIMUM_LIMIT = 100;
export const PAGINATION = {
	PAGE: "page",
	LIMIT: "limit",
	DEFAULT_PAGE: 1,
	DEFAULT_LIMIT: 30,
	MAXIMUM_LIMIT: 100,
};
export const SCHEDULER = {
	FETCH: false,
	INITIAL_FETCH: true,
	INITIAL_FETCH_DELAY: 5 * 60 * 1000,
	FETCH_INTERVAL_CRON: "*/10 * * * * *",
};
