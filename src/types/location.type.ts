export type PlaceInformation = {
	name: string;
	fullName: string;
	latitude: number;
	longitude: number;
	country: string;
	countryCode: string;
	postCode: string;
	state?: string;
	stateDistrict?: string;
	village?: string;
	region?: string;
	town?: string;
	suburb?: string;
	province?: string;
	county?: string;
	boundingbox?: string[];
};
