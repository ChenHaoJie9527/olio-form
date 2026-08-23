import { CatalogCard } from "@/site/shared/catalog";
import { exampleCatalog } from "@/site/nav";
import { Link } from "react-router";

export function HomePage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center md:px-6 md:py-28">
          <p className="text-sm font-medium text-primary">Copy-paste forms for Formisch</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Production form UI you own
          </h1>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            olio-form is a catalog of Formisch + Valibot templates. Copy the files into your app.
            There is no UI package to install.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/examples"
              className="inline-flex h-11 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Browse examples
            </Link>
            <Link
              to="/components"
              className="inline-flex h-11 items-center rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground hover:bg-muted"
            >
              Browse components
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Featured examples</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Start with authentication. Copy the schema and the composed form.
            </p>
          </div>
          <Link to="/examples" className="hidden text-sm font-medium text-primary sm:inline">
            View all
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {exampleCatalog.map((item) => (
            <CatalogCard key={item.href} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}
