import { componentCatalog } from "@/site/nav";
import { CatalogCard } from "@/site/shared/catalog";

export function HomePage() {
  return (
    <>
      <section>
        <div className="mx-auto max-w-3xl px-4 py-20 text-center md:px-6 md:py-28">
          <p className="text-sm font-medium text-primary">Copy-paste forms for Formisch</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Production form UI you own
          </h1>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            olio-form is copy-paste form UI for Formisch and Valibot. Copy the kit into
            your app, then copy a demo as a starting page. There is no UI package to install.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <h2 className="text-3xl font-semibold tracking-tight">Components</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Copy the kit, then copy a demo.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {componentCatalog.map((item) => (
            <CatalogCard key={item.href} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}
