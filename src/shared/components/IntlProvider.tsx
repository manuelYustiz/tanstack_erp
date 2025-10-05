import { createContext, type ReactNode, useContext } from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import { useLocale } from "../hooks/useLocale";
import { getMessages, type SupportedLocale } from "../i18n";

interface IntlContextValue {
	locale: SupportedLocale;
	setLocale: (locale: SupportedLocale) => void;
}

const IntlContext = createContext<IntlContextValue | undefined>(undefined);

interface IntlProviderProps {
	children: ReactNode;
}

export function IntlProvider({ children }: IntlProviderProps) {
	const { locale, setLocale } = useLocale();
	const messages = getMessages(locale);

	return (
		<IntlContext.Provider value={{ locale, setLocale }}>
			<ReactIntlProvider
				key={locale}
				locale={locale}
				messages={messages}
				defaultLocale="en"
			>
				{children}
			</ReactIntlProvider>
		</IntlContext.Provider>
	);
}

export function useIntlContext() {
	const context = useContext(IntlContext);
	if (context === undefined) {
		throw new Error("useIntlContext must be used within an IntlProvider");
	}
	return context;
}
