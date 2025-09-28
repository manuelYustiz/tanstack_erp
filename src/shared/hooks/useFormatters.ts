import { useIntl } from "react-intl";
import { formatCurrency, formatDate, formatNumber } from "../utils/formatters";

export function useFormatters() {
	const intl = useIntl();

	return {
		formatCurrency: (amount: number) => formatCurrency(amount, intl.locale),
		formatDate: (date: Date | string) => formatDate(date, intl.locale),
		formatNumber: (num: number) => formatNumber(num, intl.locale),
		formatMessage: intl.formatMessage,
		locale: intl.locale,
	};
}
