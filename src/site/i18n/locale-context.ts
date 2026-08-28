import { createContext } from "react";
import type { Locale, MessageKey } from "./messages";

export type Translate = (key: MessageKey, vars?: Record<string, string>) => string;

export type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggle: () => void;
  t: Translate;
};

export const LocaleContext = createContext<LocaleContextValue | null>(null);
