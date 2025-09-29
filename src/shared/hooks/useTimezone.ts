import { useCallback, useEffect, useState } from "react";
import { getLocalTimezone, isValidTimezone } from "../utils/dayjs";

const TIMEZONE_STORAGE_KEY = "app-timezone";

export function useTimezone() {
	const [timezone, setTimezone] = useState<string>(() => {
		// Try to get from localStorage first
		if (typeof window !== "undefined") {
			const stored = localStorage.getItem(TIMEZONE_STORAGE_KEY);
			if (stored && isValidTimezone(stored)) {
				return stored;
			}
		}
		// Fallback to detected timezone
		return getLocalTimezone();
	});

	const updateTimezone = useCallback((newTimezone: string) => {
		if (isValidTimezone(newTimezone)) {
			setTimezone(newTimezone);
			if (typeof window !== "undefined") {
				localStorage.setItem(TIMEZONE_STORAGE_KEY, newTimezone);
			}
		}
	}, []);

	useEffect(() => {
		// Auto-detect timezone on mount if not set
		if (!timezone || timezone === "UTC") {
			const detectedTimezone = getLocalTimezone();
			if (detectedTimezone !== timezone && isValidTimezone(detectedTimezone)) {
				updateTimezone(detectedTimezone);
			}
		}
	}, [timezone, updateTimezone]);

	return {
		timezone,
		setTimezone: updateTimezone,
		detectedTimezone: getLocalTimezone(),
	};
}
