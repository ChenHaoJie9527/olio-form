import { useCallback, useMemo, useState, type ReactNode } from "react";
import { LocaleContext, type Translate } from "./locale-context";
import { messages, type Locale } from "./messages";

const STORAGE_KEY = "olio-locale";

function readLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "zh") {
    return stored;
  }
  if (navigator.language.toLowerCase().startsWith("zh")) {
    return "zh";
  }
  return "en";
}

function applyDocumentLang(locale: Locale) {
  document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
}

function interpolate(template: string, vars?: Record<string, string>) {
  if (!vars) {
    return template;
  }
  return Object.entries(vars).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, value),
    template,
  );
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const initial = readLocale();
    applyDocumentLang(initial);
    return initial;
  });

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    applyDocumentLang(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggle = useCallback(() => {
    setLocaleState((prev) => {
      const next = prev === "en" ? "zh" : "en";
      applyDocumentLang(next);
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const t = useCallback<Translate>(
    (key, vars) => interpolate(messages[locale][key], vars),
    [locale],
  );

  const value = useMemo(() => ({ locale, setLocale, toggle, t }), [locale, setLocale, toggle, t]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
