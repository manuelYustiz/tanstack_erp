// Utility functions for formatting data
export const formatCurrency = (amount: number): string => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(amount);
};

export const formatDate = (date: Date | string): string => {
	const dateObj = typeof date === "string" ? new Date(date) : date;
	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	}).format(dateObj);
};

export const truncateText = (text: string, maxLength: number): string => {
	return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};
