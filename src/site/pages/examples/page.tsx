import { CatalogPage } from "@/site/shared/catalog";
import { exampleCatalog } from "@/site/nav";

export function ExamplesCatalogPage() {
  return (
    <CatalogPage
      title="Examples"
      description="Full scenes with a Valibot schema and Formisch wiring."
      items={exampleCatalog}
    />
  );
}
