import { CatalogPage } from "@/site/shared/catalog";
import { formCatalog } from "@/site/nav";

export function FormCatalogPage() {
  return (
    <CatalogPage
      title="Form"
      description="Full scenes with a Valibot schema and Formisch wiring."
      items={formCatalog}
    />
  );
}
