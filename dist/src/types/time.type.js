"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTimeToMilliseconds = void 0;
var TimeType;
(function (TimeType) {
    TimeType["weeks"] = "w";
    TimeType["hours"] = "h";
    TimeType["days"] = "d";
    TimeType["minutes"] = "m";
    TimeType["seconds"] = "s";
    TimeType["milliseconds"] = "ms";
})(TimeType || (TimeType = {}));
const convertTimeToMilliseconds = (time) => {
    const timeType = time.slice(-1);
    const timeValue = parseInt(time.slice(0, -1));
    switch (timeType) {
        case TimeType.weeks:
            return timeValue * 604800000;
        case TimeType.days:
            return timeValue * 86400000;
        case TimeType.hours:
            return timeValue * 3600000;
        case TimeType.minutes:
            return timeValue * 60000;
        case TimeType.seconds:
            return timeValue * 1000;
        case TimeType.milliseconds:
            return timeValue;
        default:
            throw new Error("Invalid time type");
    }
};
exports.convertTimeToMilliseconds = convertTimeToMilliseconds;
