export type APIResponse = {
	status: "success" | "error";
	data?: object | string | number | null;
	message?: string;
	timestamp: number;
};

export class ResponseBuilder {
	constructor() {}

	public build = (
		status: "success" | "error",
		data?: object | string | number | null,
		message?: string,
	): APIResponse => {
		return {
			status,
			data,
			message,
			timestamp: Date.now(),
		};
	};

	public success = (data?: object | string | number | null, message?: string): APIResponse => {
		return this.build("success", data, message);
	};

	public successWithoutMessage = (data?: object | string | number | null): APIResponse => {
		return this.build("success", data, undefined);
	};

	public successWithoutData = (message?: string): APIResponse => {
		return this.build("success", null, message);
	};

	public error = (data?: object | string | number | null, message?: string): APIResponse => {
		return this.build("error", data, message);
	};

	public errorWithoutData = (message?: string): APIResponse => {
		return this.build("error", null, message);
	};
}

export const responseBuilder = (
	status: "success" | "error",
	data?: object | string | number | null,
	message?: string,
): APIResponse => {
	return {
		status,
		data,
		message,
		timestamp: Date.now(),
	};
};
