// Utility functions for formatting data
export const formatCurrency = (amount: number, locale: string = "en-US"): string => {
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency: locale.startsWith("es") ? "EUR" : "USD",
	}).format(amount);
};

export const formatDate = (date: Date | string, locale: string = "en-US"): string => {
	const dateObj = typeof date === "string" ? new Date(date) : date;
	return new Intl.DateTimeFormat(locale, {
		year: "numeric",
		month: "short",
		day: "numeric",
	}).format(dateObj);
};

export const formatNumber = (num: number, locale: string = "en-US"): string => {
	return new Intl.NumberFormat(locale).format(num);
};

export const truncateText = (text: string, maxLength: number): string => {
	return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};
