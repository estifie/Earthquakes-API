"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Distance = void 0;
const unitAliases = new Map([
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
const unitMap = new Map([
    ["m", 0],
    ["km", 1],
    ["mi", 2],
    ["yd", 3],
    ["ft", 4],
]);
const unitConversionMap = new Map([
    [0, 1],
    [1, 1000],
    [2, 1609.34],
    [3, 0.9144],
    [4, 0.3048],
]);
class Distance {
    constructor(distance, unit) {
        this.distance = distance;
        this.unit = this.unitFromString(unitAliases.get(unit) || "m");
    }
    unitFromString(unit) {
        return unitMap.get(unit) || 0;
    }
    toMeter() {
        return this.distance * (unitConversionMap.get(this.unit) || 0);
    }
    toEarthRadian() {
        return this.toMeter() / 6378160;
    }
}
exports.Distance = Distance;
