import mongoose from "mongoose";

const EarthquakePlaceInformation = new mongoose.Schema(
	{
		name: {
			type: String,
			required: false,
		},
		fullName: {
			type: String,
			required: false,
		},
		longitude: {
			type: Number,
			required: false,
		},
		latitude: {
			type: Number,
			required: false,
		},
		country: {
			type: String,
			required: false,
		},
		countryCode: {
			type: String,
			required: false,
		},
		postCode: {
			type: String,
			required: false,
		},
		state: {
			type: String,
			required: false,
		},
		stateDistrict: {
			type: String,
			required: false,
		},
		village: {
			type: String,
			required: false,
		},
		region: {
			type: String,
			required: false,
		},
		town: {
			type: String,
			required: false,
		},
		suburb: {
			type: String,
			required: false,
		},
		province: {
			type: String,
			required: false,
		},
		county: {
			type: String,
			required: false,
		},
		boundingbox: {
			type: [String],
			required: false,
		},
	},
	{ _id: false },
);

const EarthquakeSchema = new mongoose.Schema({
	code: {
		type: String,
		required: false,
	},
	location: {
		type: String,
		required: true,
	},
	magnitude: {
		value: {
			type: Number,
			required: true,
		},
		uncertainty: {
			type: Number,
			required: false,
		},
	},
	magType: {
		type: String,
		required: false,
	},
	time: {
		value: {
			type: String,
			required: true,
		},
		uncertainty: {
			type: Number,
			required: false,
		},
	},
	coordinates: {
		latitude: {
			value: {
				type: Number,
				required: true,
			},
			uncertainty: {
				type: Number,
				required: false,
			},
		},
		longitude: {
			value: {
				type: Number,
				required: true,
			},
			uncertainty: {
				type: Number,
				required: false,
			},
		},
	},
	depth: {
		meters: {
			value: {
				type: Number,
				required: true,
			},
			uncertainty: {
				type: Number,
				required: false,
			},
		},
	},
	type: {
		type: String,
		default: "earthquake",
	},
	source: {
		type: String,
		required: false,
	},
	status: {
		type: String,
		default: false,
	},
	numberOfStations: {
		type: Number,
		required: false,
	},
	tsunami: {
		type: Boolean,
		default: false,
	},
	placeInformation: {
		type: EarthquakePlaceInformation,
		required: false,
	},
	deleted: {
		type: Boolean,
		default: false,
		select: false,
	},
});

EarthquakeSchema.index({ magnitude: 1, location: 1, time: 1, coordinates: 1, depth: 1 }, { unique: true });

EarthquakeSchema.set("toJSON", {
	virtuals: true,
	transform: (_document: any, returnedObject: any) => {
		delete returnedObject._id;
		delete returnedObject.id;
		delete returnedObject.__v;
		delete returnedObject.deleted;

		const orderedObject = {
			code: returnedObject.code,
			location: returnedObject.location,
			magnitude: {
				value: returnedObject.magnitude.value,
				uncertainty: returnedObject.magnitude.uncertainty,
			},
			magType: returnedObject.magType,
			time: {
				value: returnedObject.time.value,
				uncertainty: returnedObject.time.uncertainty,
			},
			coordinates: {
				latitude: {
					value: returnedObject.coordinates.latitude.value,
					uncertainty: returnedObject.coordinates.latitude.uncertainty,
				},
				longitude: {
					value: returnedObject.coordinates.longitude.value,
					uncertainty: returnedObject.coordinates.longitude.uncertainty,
				},
			},
			depth: {
				meters: {
					value: returnedObject.depth.meters.value,
					uncertainty: returnedObject.depth.meters.uncertainty,
				},
			},
			type: returnedObject.type,
			source: returnedObject.source,
			status: returnedObject.status,
			numberOfStations: returnedObject.numberOfStations,
			tsunami: returnedObject.tsunami,
			placeInformation: returnedObject.placeInformation,
		};

		return orderedObject;
	},
});

const Earthquake = mongoose.model("Earthquake", EarthquakeSchema);

export default Earthquake;
