import axios from "axios";
import { DEFAULT_LIMIT, DEFAULT_PAGE, MAXIMUM_LIMIT } from "./config/constants";
import { PlaceInformation } from "./types";

export const safeParseFloat = (value: any) => {
	const parsed = parseFloat(value);
	return isNaN(parsed) ? null : parsed;
};

export const addressFindByLatLon = async (lat: number, lon: number): Promise<PlaceInformation | null> => {
	try {
		const response = await axios.get(
			`https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lon}&zoom=18&format=jsonv2`,
			{
				headers: {
					"Accept-Language": "en-US,en;q=0.5",
				},
			},
		);

		if (response.status !== 200 || response.data.error) {
			return null;
		}

		const { name, display_name, address, boundingbox } = response.data;

		return {
			name: name === "" ? display_name : name,
			fullName: display_name,
			latitude: lat,
			longitude: lon,
			country: address.country,
			countryCode: address.country_code,
			postCode: address.postcode,
			state: address.state,
			stateDistrict: address.state_district,
			village: address.village,
			region: address.region,
			province: address.province,
			county: address.county,
			town: address.town,
			suburb: address.suburb,
			boundingbox,
		};
	} catch (error: any) {
		return null;
	}
};

export const calculatePagination = (desiredPage: string | undefined, desiredLimit: string | undefined) => {
	const page = Math.max(safeParseFloat(desiredPage) || DEFAULT_PAGE, DEFAULT_PAGE);
	const limit = Math.min(safeParseFloat(desiredLimit) || DEFAULT_LIMIT, MAXIMUM_LIMIT);

	return {
		page,
		limit,
	};
};
