import type dayjs from "dayjs";
import dayjsInstance from "./config";
import { getLocalTimezone } from "./timezone";

export const formatDate = (
	date: Date | string | dayjs.Dayjs,
	locale: string = "en-US",
	timezone?: string
): string => {
	const tz = timezone || getLocalTimezone();
	const dayjsDate = dayjsInstance(date).tz(tz);

	// Use dayjs with locale-aware formatting
	if (locale.startsWith("es")) {
		return dayjsDate.format("DD MMM YYYY");
	}
	return dayjsDate.format("MMM DD, YYYY");
};

export const formatDateTime = (
	date: Date | string | dayjs.Dayjs,
	locale: string = "en-US",
	timezone?: string
): string => {
	const tz = timezone || getLocalTimezone();
	const dayjsDate = dayjsInstance(date).tz(tz);

	if (locale.startsWith("es")) {
		return dayjsDate.format("DD MMM YYYY HH:mm");
	}
	return dayjsDate.format("MMM DD, YYYY h:mm A");
};

export const formatRelativeTime = (
	date: Date | string | dayjs.Dayjs,
	timezone?: string
): string => {
	const tz = timezone || getLocalTimezone();
	return dayjsInstance(date).tz(tz).fromNow();
};
