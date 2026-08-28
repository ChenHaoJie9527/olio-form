import { useLocale } from "@/site/i18n";

export function NotFoundPage() {
  const { t } = useLocale();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">{t("notFoundTitle")}</h1>
      <p className="mt-2 text-muted-foreground">{t("notFoundLead")}</p>
    </article>
  );
}
