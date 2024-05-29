"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCHEDULER = exports.PAGINATION = exports.MAXIMUM_LIMIT = exports.DEFAULT_LIMIT = exports.DEFAULT_PAGE = exports.DETAILED_URL = exports.FEED_URL = exports.FEED_PATH = exports.FEED_BASE = void 0;
exports.FEED_BASE = "https://earthquake.usgs.gov";
exports.FEED_PATH = "/earthquakes/feed/v1.0/summary/all_day.geojson";
exports.FEED_URL = `${exports.FEED_BASE}${exports.FEED_PATH}`;
exports.DETAILED_URL = `${exports.FEED_BASE}/earthquakes/feed/v1.0/detail/`;
exports.DEFAULT_PAGE = 1;
exports.DEFAULT_LIMIT = 30;
exports.MAXIMUM_LIMIT = 100;
exports.PAGINATION = {
    PAGE: "page",
    LIMIT: "limit",
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 30,
    MAXIMUM_LIMIT: 100,
};
exports.SCHEDULER = {
    FETCH: true,
    INITIAL_FETCH: true,
    INITIAL_FETCH_DELAY: 5 * 60 * 1000,
    FETCH_INTERVAL_CRON: "*/10 * * * * *",
};
