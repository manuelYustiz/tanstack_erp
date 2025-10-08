import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useEffect } from "react";
import { useIntlContext } from "../shared/components/IntlProvider";
import type { SupportedLocale } from "../shared/utils/i18n";

// Validate if the lang parameter is a valid locale
function isValidLocale(lang: string): lang is SupportedLocale {
	return lang === "en" || lang === "es";
}

export const Route = createFileRoute("/$lang")({
	// Validate the lang parameter before loading
	beforeLoad: ({ params }) => {
		if (!isValidLocale(params.lang)) {
			throw redirect({
				to: "/$lang",
				params: { lang: "en" },
			});
		}
	},
	component: LanguageLayout,
});

function LanguageLayout() {
	const { lang } = Route.useParams();
	const { setLocale } = useIntlContext();

	// Update the locale when the lang parameter changes
	useEffect(() => {
		if (isValidLocale(lang)) {
			setLocale(lang);
		}
	}, [lang, setLocale]);

	return <Outlet />;
}
