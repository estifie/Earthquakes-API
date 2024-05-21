import { SOURCES } from "../config/sources";

const getAllSources = async () => {
	try {
		return SOURCES;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

const getSourceById = async (id: string) => {
	try {
		const source = SOURCES[id];
		if (!source) {
			throw new Error("Source not found");
		}
		return source;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export default { getAllSources, getSourceById };
