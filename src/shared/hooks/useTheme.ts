import { useCallback, useEffect, useState } from "react";

export type Theme = "theme-1" | "theme-2";
export type Mode = "light" | "dark";

export interface ThemeConfig {
	theme: Theme;
	mode: Mode;
}

const THEME_STORAGE_KEY = "app-theme-config";

const DEFAULT_THEME_CONFIG: ThemeConfig = {
	theme: "theme-1",
	mode: "light",
};

export function useTheme() {
	const [themeConfig, setThemeConfig] = useState<ThemeConfig>(() => {
		try {
			const stored = localStorage.getItem(THEME_STORAGE_KEY);
			return stored ? JSON.parse(stored) : DEFAULT_THEME_CONFIG;
		} catch {
			return DEFAULT_THEME_CONFIG;
		}
	});

	// Apply theme to document
	useEffect(() => {
		const root = document.documentElement;

		// Remove existing theme and mode classes
		root.classList.remove("theme-1", "theme-2", "dark", "light");
		root.removeAttribute("data-theme");

		// Apply new theme
		root.setAttribute("data-theme", themeConfig.theme);
		root.classList.add(themeConfig.mode);

		// Store in localStorage
		try {
			localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(themeConfig));
		} catch {
			// Ignore localStorage errors
		}
	}, [themeConfig]);

	const setTheme = useCallback((theme: Theme) => {
		setThemeConfig((prev) => ({
			...prev,
			theme,
		}));
	}, []);

	const setMode = useCallback((mode: Mode) => {
		setThemeConfig((prev) => ({
			...prev,
			mode,
		}));
	}, []);

	const toggleMode = useCallback(() => {
		setThemeConfig((prev) => ({
			...prev,
			mode: prev.mode === "light" ? "dark" : "light",
		}));
	}, []);

	const toggleTheme = useCallback(() => {
		setThemeConfig((prev) => ({
			...prev,
			theme: prev.theme === "theme-1" ? "theme-2" : "theme-1",
		}));
	}, []);

	return {
		theme: themeConfig.theme,
		mode: themeConfig.mode,
		setTheme,
		setMode,
		toggleMode,
		toggleTheme,
		themeConfig,
	};
}
