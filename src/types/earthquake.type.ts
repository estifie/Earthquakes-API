import { PlaceInformation } from "./location.type";

type Earthquake = {
	code?: string;
	location: string;
	magnitude: {
		value: number | null;
		uncertainty?: number | null;
		confidence?: number | null;
	};
	magType?: string;
	time: {
		value: string | null;
		uncertainty?: number | null;
		confidence?: number | null;
	};
	epochTime: number;
	status?: string;
	source?: string;
	coordinates: {
		latitude: {
			value: number | null;
			uncertainty?: number | null;
			confidence?: number | null;
		};
		longitude: {
			value: number | null;
			uncertainty?: number | null;
			confidence?: number | null;
		};
		raw: {
			type: string;
			coordinates: number[];
		};
	};
	depth: {
		meters: {
			value: number | null;
			uncertainty?: number | null;
			confidence?: number | null;
		};
	};
	numberOfStations?: number | null;
	type?: string;
	tsunami?: boolean;
	deleted?: boolean;
	placeInformation?: PlaceInformation | null;
};

// Data that is returned from the API
type EarthquakeProperties = {
	mag: number;
	place: string;
	time: number;
	updated: number;
	tz: number;
	url: string;
	detail: string;
	felt: number;
	cdi: number;
	mmi: number;
	alert: string;
	status: string;
	tsunami: number;
	sig: number;
	net: string;
	code: string;
	ids: string;
	sources: string;
	types: string;
	nst: number;
	dmin: number;
	rms: number;
	gap: number;
	magType: string;
	type: string;
	title: string;
};

export { Earthquake, EarthquakeProperties };
