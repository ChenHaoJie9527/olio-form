import { CatalogPage } from "@/site/shared/catalog";
import { componentCatalog } from "@/site/nav";
import { useLocale } from "@/site/i18n";

export function ComponentsCatalogPage() {
  const { t } = useLocale();

  return (
    <CatalogPage
      title={t("catalogTitle")}
      description={t("catalogLead")}
      items={componentCatalog}
    />
  );
}
