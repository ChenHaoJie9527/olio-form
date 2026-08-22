import { Link } from "@/site/router";
import type { CatalogItem } from "@/site/nav";

export function CatalogCard({ item }: { item: CatalogItem }) {
  return (
    <Link
      href={item.href}
      className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:bg-muted/40"
    >
      <h2 className="text-base font-semibold tracking-tight text-card-foreground">{item.title}</h2>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{item.description}</p>
      <span className="mt-4 text-sm font-medium text-primary group-hover:underline">
        View {item.title}
      </span>
    </Link>
  );
}

export function CatalogPage({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: CatalogItem[];
}) {
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
