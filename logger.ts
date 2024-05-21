import { createLogger, format, transports } from "winston";

const logger = createLogger({
	level: "info",
	format: format.combine(format.timestamp(), format.json()),
});

if (process.env.BUILD !== "production") {
	logger.add(
		new transports.Console({
			format: format.combine(format.colorize(), format.simple()),
		}),
	);
} else {
	logger.add(
		new transports.File({
			filename: "error.log",
			level: "error",
		}),
	);
	logger.add(
		new transports.File({
			filename: "combined.log",
		}),
	);
}

export default logger;
