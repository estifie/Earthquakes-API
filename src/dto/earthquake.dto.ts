interface EarthquakeParamsDto {
	showDeleted: boolean;
	page: number;
	limit: number;
	time?: string;
	magnitude?: string;
	longitude?: string;
	latitude?: string;
	distance?: number | null;
	unit?: string;
	magType?: string;
}

export { EarthquakeParamsDto };
