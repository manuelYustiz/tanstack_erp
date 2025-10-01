// Re-export date formatters from date utilities
export {
	formatDate,
	formatDateTime,
	formatRelativeTime,
} from "./date/formatters";

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

export const formatNumber = (num: number, locale: string = "en-US"): string => {
	return new Intl.NumberFormat(locale).format(num);
};

export const truncateText = (text: string, maxLength: number): string => {
	return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};
