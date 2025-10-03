import { useThemeContext } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { ByteCounterDemo } from "../shared/components/ByteCounterDemo";
import { useIntlContext } from "../shared/components/IntlProvider";
import { TimezoneDemo } from "../shared/components/TimezoneDemo";
import { Button } from "../shared/components/ui/button";
import { useMeta } from "../shared/hooks/useMeta";
import { AVAILABLE_LOCALES, type SupportedLocale } from "../shared/i18n";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	// const { theme, mode, toggleTheme, toggleMode } = useTheme();
	const { locale, setLocale } = useIntlContext();
	const intl = useIntl();
	const {
		appearance,
		onAppearanceChange,
		accentColor,
		onAccentColorChange,
		...rest
	} = useThemeContext();

	console.log(rest);

	const toggleMode = useCallback(() => {
		onAppearanceChange(appearance === "dark" ? "light" : "dark");
	}, [appearance, onAppearanceChange]);

	const toggleTheme = useCallback(() => {
		onAccentColorChange(accentColor === "indigo" ? "violet" : "indigo");
	}, [accentColor, onAccentColorChange]);

	// Set dynamic meta tags for the home page
	useMeta({
		title: "TanStack ERP - Home",
		description: intl.formatMessage({ id: "app.description" }),
		keywords: "ERP, TanStack, React, TypeScript, Vite, Router, Modern ERP",
		author: "TanStack ERP Team",
		// Open Graph tags (Facebook, LinkedIn, Discord)
		ogTitle: "TanStack ERP - Modern ERP System",
		ogDescription: intl.formatMessage({ id: "app.description" }),
		ogImage: "https://tanstack-erp.com/og-home.jpg",
		ogUrl: window.location.href,
		ogType: "website",
		ogSiteName: "TanStack ERP",
		// Twitter Card tags
		twitterCard: "summary_large_image",
		twitterTitle: "TanStack ERP - Modern ERP System",
		twitterDescription: intl.formatMessage({ id: "app.description" }),
		twitterImage: "https://tanstack-erp.com/twitter-home.jpg",
	});

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
			<div className="container mx-auto p-8">
				{/* Language Switcher */}
				<div className="flex justify-end mb-4">
					<select
						value={locale}
						onChange={(e) => setLocale(e.target.value as SupportedLocale)}
						className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
					>
						{AVAILABLE_LOCALES.map((lang) => (
							<option key={lang.code} value={lang.code}>
								{lang.name}
							</option>
						))}
					</select>
				</div>

				<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
					<FormattedMessage id="app.welcome" />
				</h1>

				<p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">
					<FormattedMessage id="app.description" />
				</p>

				<div className="mb-8">
					<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
						<FormattedMessage id="features.title" />
					</h2>
					<ul className="space-y-2 text-gray-700 dark:text-gray-300">
						<li className="flex items-center">
							<span className="w-2 h-2 bg-theme-primary rounded-full mr-3"></span>
							⚡ <FormattedMessage id="features.vite" />
						</li>
						<li className="flex items-center">
							<span className="w-2 h-2 bg-theme-primary rounded-full mr-3"></span>
							⚛️ <FormattedMessage id="features.react" />
						</li>
						<li className="flex items-center">
							<span className="w-2 h-2 bg-theme-primary rounded-full mr-3"></span>
							🧹 <FormattedMessage id="features.biome" />
						</li>
						<li className="flex items-center">
							<span className="w-2 h-2 bg-theme-primary rounded-full mr-3"></span>
							🚦 <FormattedMessage id="features.router" />
						</li>
						<li className="flex items-center">
							<span className="w-2 h-2 bg-theme-primary rounded-full mr-3"></span>
							📁 <FormattedMessage id="features.architecture" />
						</li>
						<li className="flex items-center">
							<span className="w-2 h-2 bg-theme-primary rounded-full mr-3"></span>
							🎨 <FormattedMessage id="features.tailwind" />
						</li>
						<li className="flex items-center">
							<span className="w-2 h-2 bg-theme-primary rounded-full mr-3"></span>
							🌙 <FormattedMessage id="features.theme" />
						</li>
					</ul>
				</div>

				{/* Theme Demo Section */}
				<div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
					<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
						<FormattedMessage id="theme.demo.title" />
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
						<div className="bg-theme-primary-100 p-4 rounded-lg border border-theme-primary-200">
							<h4 className="font-semibold text-theme-primary-800 mb-2">
								Primary Theme
							</h4>
							<p className="text-theme-primary-600">
								Current theme: {accentColor}
							</p>
						</div>
						<div className="bg-theme-secondary-100 p-4 rounded-lg border border-theme-secondary-200">
							<h4 className="font-semibold text-theme-secondary-800 mb-2">
								Secondary Colors
							</h4>
							<p className="text-theme-secondary-600">
								Complementary colors for accents
							</p>
						</div>
						<div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
							<h4 className="font-semibold text-gray-900 dark:text-white mb-2">
								Dark Mode
							</h4>
							<p className="text-gray-600 dark:text-gray-300">
								Current mode: {appearance}
							</p>
						</div>
					</div>
				</div>

				{/* Theme Controls */}
				<div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
					<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
						Theme Controls
					</h3>
					<div className="flex flex-wrap gap-4 items-center">
						<Button onClick={toggleTheme} variant="default">
							Switch to {accentColor === "indigo" ? "Violeta" : "indigo"} Theme
						</Button>

						<Button onClick={toggleMode} variant="outline">
							<FormattedMessage
								id="theme.toggle"
								values={{
									mode: intl.formatMessage({
										id: appearance === "light" ? "common.dark" : "common.light",
									}),
								}}
							/>
						</Button>
					</div>

					<div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded text-sm text-gray-600 dark:text-gray-400">
						<FormattedMessage
							id="theme.current"
							values={{
								theme: accentColor,
								mode: appearance,
							}}
						/>
					</div>
				</div>

				{/* Timezone Demo */}
				<TimezoneDemo />

				{/* Byte Counter Demo */}
				<div className="mt-8">
					<ByteCounterDemo />
				</div>
			</div>
		</div>
	);
}
