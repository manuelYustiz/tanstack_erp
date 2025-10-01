import type dayjs from "dayjs";
import dayjsInstance from "./config";

// Utility functions for timezone-aware date handling
export const getLocalTimezone = (): string => {
	return dayjsInstance.tz.guess();
};

export const formatDateWithTimezone = (
	date: Date | string | dayjs.Dayjs,
	format: string = "YYYY-MM-DD HH:mm:ss",
	timezone?: string
): string => {
	const tz = timezone || getLocalTimezone();
	return dayjsInstance(date).tz(tz).format(format);
};

export const convertTimezone = (
	date: Date | string | dayjs.Dayjs,
	fromTimezone: string,
	toTimezone: string
): dayjs.Dayjs => {
	return dayjsInstance.tz(date, fromTimezone).tz(toTimezone);
};

export const getCurrentTimestamp = (timezone?: string): dayjs.Dayjs => {
	const tz = timezone || getLocalTimezone();
	return dayjsInstance().tz(tz);
};

export const isValidTimezone = (timezone: string): boolean => {
	try {
		dayjsInstance().tz(timezone);
		return true;
	} catch {
		return false;
	}
};
