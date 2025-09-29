import dayjs, { getLocalTimezone } from "./dayjs";

// Utility functions for formatting data
export const formatCurrency = (
	amount: number,
	locale: string = "en-US"
): string => {
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency: locale.startsWith("es") ? "EUR" : "USD",
	}).format(amount);
};

export const formatDate = (
	date: Date | string | dayjs.Dayjs,
	locale: string = "en-US",
	timezone?: string
): string => {
	const tz = timezone || getLocalTimezone();
	const dayjsDate = dayjs(date).tz(tz);

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
	const dayjsDate = dayjs(date).tz(tz);

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
	return dayjs(date).tz(tz).fromNow();
};

export const formatNumber = (num: number, locale: string = "en-US"): string => {
	return new Intl.NumberFormat(locale).format(num);
};

export const truncateText = (text: string, maxLength: number): string => {
	return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};
