const unitAliases = new Map<string, string>([
	["meters", "m"],
	["metre", "m"],
	["meter", "m"],
	["m", "m"],
	["kilometers", "km"],
	["kilometer", "km"],
	["kmeters", "km"],
	["km", "km"],
	["miles", "mi"],
	["mi", "mi"],
	["mile", "mi"],
	["yards", "yd"],
	["yd", "yd"],
	["yard", "yd"],
	["feet", "ft"],
	["ft", "ft"],
]);

const unitMap = new Map<string, number>([
	["m", 0],
	["km", 1],
	["mi", 2],
	["yd", 3],
	["ft", 4],
]);

const unitConversionMap = new Map<number, number>([
	[0, 1],
	[1, 1000],
	[2, 1609.34],
	[3, 0.9144],
	[4, 0.3048],
]);

export class Distance {
	private distance: number;
	private unit: number;

	constructor(distance: number, unit: string) {
		this.distance = distance;

		this.unit = this.unitFromString(unitAliases.get(unit) || "m");
	}

	unitFromString(unit: string): number {
		return unitMap.get(unit) || 0;
	}

	toMeter(): number {
		return this.distance * (unitConversionMap.get(this.unit) || 0);
	}

	toEarthRadian(): number {
		return this.toMeter() / 6378160;
	}
}
