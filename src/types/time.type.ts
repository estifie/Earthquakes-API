enum TimeType {
	weeks = "w",
	hours = "h",
	days = "d",
	minutes = "m",
	seconds = "s",
	milliseconds = "ms",
}

export type Time = `${number}${TimeType}` | `${number}`;

export const convertTimeToMilliseconds = (time: Time): number => {
	const timeType = time.slice(-1) as TimeType;
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
