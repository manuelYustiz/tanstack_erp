// Import message files
import enMessages from '../locales/en/messages.json';
import esMessages from '../locales/es/messages.json';

// Supported locales
export type SupportedLocale = 'en' | 'es';

// Default locale
export const DEFAULT_LOCALE: SupportedLocale = 'en';

// Messages type
export type Messages = Record<string, string>;

// Messages collection
export const messages: Record<SupportedLocale, Messages> = {
  en: enMessages,
  es: esMessages,
};

// Get messages for a locale
export const getMessages = (locale: SupportedLocale): Messages => {
  return messages[locale] || messages[DEFAULT_LOCALE];
};

// Get locale from browser or return default
export const getDefaultLocale = (): SupportedLocale => {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE;
  }

  const browserLang = navigator.language.split('-')[0] as SupportedLocale;
  return Object.keys(messages).includes(browserLang) ? browserLang : DEFAULT_LOCALE;
};

// Available locales
export const AVAILABLE_LOCALES: Array<{ code: SupportedLocale; name: string }> = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
];