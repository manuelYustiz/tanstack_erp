import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

// Configure dayjs plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

// Default timezone
export const DEFAULT_TIMEZONE = "UTC";

// Export configured dayjs
export default dayjs;

// Utility functions for timezone-aware date handling
export const getLocalTimezone = (): string => {
	return dayjs.tz.guess();
};

export const formatDateWithTimezone = (
	date: Date | string | dayjs.Dayjs,
	format: string = "YYYY-MM-DD HH:mm:ss",
	timezone?: string
): string => {
	const tz = timezone || getLocalTimezone();
	return dayjs(date).tz(tz).format(format);
};

export const convertTimezone = (
	date: Date | string | dayjs.Dayjs,
	fromTimezone: string,
	toTimezone: string
): dayjs.Dayjs => {
	return dayjs.tz(date, fromTimezone).tz(toTimezone);
};

export const getCurrentTimestamp = (timezone?: string): dayjs.Dayjs => {
	const tz = timezone || getLocalTimezone();
	return dayjs().tz(tz);
};

export const isValidTimezone = (timezone: string): boolean => {
	try {
		dayjs().tz(timezone);
		return true;
	} catch {
		return false;
	}
};

// Common timezone list for UI
export const COMMON_TIMEZONES = [
	{ value: "UTC", label: "UTC" },
	{ value: "America/New_York", label: "Eastern Time (US & Canada)" },
	{ value: "America/Chicago", label: "Central Time (US & Canada)" },
	{ value: "America/Denver", label: "Mountain Time (US & Canada)" },
	{ value: "America/Los_Angeles", label: "Pacific Time (US & Canada)" },
	{ value: "Europe/London", label: "London" },
	{ value: "Europe/Paris", label: "Paris" },
	{ value: "Europe/Berlin", label: "Berlin" },
	{ value: "Europe/Madrid", label: "Madrid" },
	{ value: "Asia/Tokyo", label: "Tokyo" },
	{ value: "Asia/Shanghai", label: "Shanghai" },
	{ value: "Asia/Kolkata", label: "India" },
	{ value: "Australia/Sydney", label: "Sydney" },
];
