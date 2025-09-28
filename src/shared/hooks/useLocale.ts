import { useCallback, useEffect, useState } from "react";
import { getDefaultLocale, type SupportedLocale } from "../i18n";

const LOCALE_STORAGE_KEY = "app-locale";

export function useLocale() {
	const [locale, setLocaleState] = useState<SupportedLocale>(() => {
		try {
			const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
			return (stored as SupportedLocale) || getDefaultLocale();
		} catch {
			return getDefaultLocale();
		}
	});

	// Store locale in localStorage when it changes
	useEffect(() => {
		try {
			localStorage.setItem(LOCALE_STORAGE_KEY, locale);
		} catch {
			// Ignore localStorage errors
		}
	}, [locale]);

	const setLocale = useCallback((newLocale: SupportedLocale) => {
		setLocaleState(newLocale);
	}, []);

	return {
		locale,
		setLocale,
	};
}
