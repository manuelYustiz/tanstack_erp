import type dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { getLocalTimezone } from "../utils/dayjs";
import {
	formatCurrency,
	formatDate,
	formatDateTime,
	formatNumber,
	formatRelativeTime,
} from "../utils/formatters";

export function useFormatters(timezone?: string) {
	const intl = useIntl();
	const [userTimezone, setUserTimezone] = useState<string>(
		timezone || getLocalTimezone()
	);

	useEffect(() => {
		if (!timezone) {
			setUserTimezone(getLocalTimezone());
		}
	}, [timezone]);

	return {
		formatCurrency: (amount: number) => formatCurrency(amount, intl.locale),
		formatDate: (date: Date | string | dayjs.Dayjs) =>
			formatDate(date, intl.locale, userTimezone),
		formatDateTime: (date: Date | string | dayjs.Dayjs) =>
			formatDateTime(date, intl.locale, userTimezone),
		formatRelativeTime: (date: Date | string | dayjs.Dayjs) =>
			formatRelativeTime(date, userTimezone),
		formatNumber: (num: number) => formatNumber(num, intl.locale),
		formatMessage: intl.formatMessage,
		locale: intl.locale,
		timezone: userTimezone,
		setTimezone: setUserTimezone,
	};
}
