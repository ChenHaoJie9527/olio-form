import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/site/i18n";
import { headerLinks } from "@/site/nav";

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    return (
      document.documentElement.classList.contains("dark") ||
      localStorage.getItem("olio-theme") === "dark"
    );
  });

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("olio-theme", next ? "dark" : "light");
  };

  return { dark, toggle };
}

export function DocsLayout() {
  const { pathname } = useLocation();
  const { dark, toggle } = useDarkMode();
  const { locale, toggle: toggleLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const [openForPath, setOpenForPath] = useState(pathname);

  if (openForPath !== pathname) {
    setOpenForPath(pathname);
    setOpen(false);
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto grid h-16 max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 md:px-6">
          <Link to="/" className="text-sm font-semibold tracking-tight">
            olio-form
          </Link>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-md border border-border text-xs font-semibold"
              onClick={toggleLocale}
              aria-label={locale === "en" ? t("switchToZh") : t("switchToEn")}
            >
              {locale === "en" ? "中" : "EN"}
            </button>
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-md border border-border"
              onClick={toggle}
              aria-label={dark ? t("switchToLight") : t("switchToDark")}
            >
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <Link
              to="/components"
              className="hidden h-9 items-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 md:inline-flex"
            >
              {t("browseComponents")}
            </Link>
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-md border border-border md:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? t("closeNav") : t("openNav")}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="border-t border-border px-4 py-3 md:hidden">
            <nav className="grid gap-1">
              {headerLinks.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "rounded-md px-2 py-2 text-sm",
                      isActive ? "bg-muted font-medium text-foreground" : "text-muted-foreground",
                    )
                  }
                >
                  {t("navComponents")}
                </NavLink>
              ))}
              <Link
                to="/components"
                className="mt-1 inline-flex h-10 items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground"
              >
                {t("browseComponents")}
              </Link>
            </nav>
          </div>
        ) : null}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6">
          <nav className="flex flex-wrap gap-4 text-sm">
            {headerLinks.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-muted-foreground hover:text-foreground"
              >
                {t("navComponents")}
              </Link>
            ))}
          </nav>
          <p className="max-w-xl text-xs text-muted-foreground">
            {t("footerBeforeWireframes")}
            <a
              href="https://www.figma.com/design/oMHRevfhOXyaIuMQjyPnw7/Website-Wireframes-UI-Kit--Community-"
              className="underline-offset-4 hover:underline"
            >
              {t("footerWireframes")}
            </a>
            {t("footerBeforeForms")}
            <a
              href="https://www.figma.com/community/file/1148375559326132425/essential-forms-controls-ui-kit"
              className="underline-offset-4 hover:underline"
            >
              {t("footerForms")}
            </a>
            {t("footerAfterForms")}
            <a href="https://formisch.dev/" className="underline-offset-4 hover:underline">
              Formisch
            </a>
            {t("footerAfterFormisch")}
          </p>
        </div>
      </footer>
    </div>
  );
}
