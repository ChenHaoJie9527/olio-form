import { Link } from "react-router";
import { useLocale, type MessageKey } from "@/site/i18n";
import type { CatalogId, CatalogItem } from "@/site/nav";

const catalogKeys: Record<CatalogId, { title: MessageKey; description: MessageKey }> = {
  button: { title: "catalogButtonTitle", description: "catalogButtonDescription" },
  "text-field": { title: "catalogTextFieldTitle", description: "catalogTextFieldDescription" },
  form: { title: "catalogFormTitle", description: "catalogFormDescription" },
};

export function CatalogCard({ item }: { item: CatalogItem }) {
  const { t } = useLocale();
  const title = t(catalogKeys[item.id].title);
  const description = t(catalogKeys[item.id].description);

  return (
    <Link
      to={item.href}
      className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:bg-muted/40"
    >
      <h2 className="text-base font-semibold tracking-tight text-card-foreground">{title}</h2>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{description}</p>
      <span className="mt-4 text-sm font-medium text-primary group-hover:underline">
        {t("catalogView", { name: title })}
      </span>
    </Link>
  );
}

interface CatalogPageProps {
  title: string;
  description: string;
  items: CatalogItem[];
}

export function CatalogPage({ title, description, items }: CatalogPageProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <CatalogCard key={item.href} item={item} />
        ))}
      </div>
    </section>
  );
}
