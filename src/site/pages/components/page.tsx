import { CatalogPage } from "@/site/shared/catalog";
import { componentCatalog } from "@/site/nav";

export function ComponentsCatalogPage() {
  return (
    <CatalogPage
      title="Components"
      description="Copy these primitives first. Examples are composed from them."
      items={componentCatalog}
    />
  );
}
