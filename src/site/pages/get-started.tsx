import { CodePanel } from "@/site/code-panel";
import { sources } from "@/site/sources";

const install = `pnpm add @formisch/react valibot clsx tailwind-merge lucide-react
pnpm add -D tailwindcss @tailwindcss/vite`;

const alias = `{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`;

const viteAlias = `import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});`;

export function GetStartedPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Get Started</h1>
      <p className="mt-2 text-muted-foreground">
        olio-form is a copy-paste catalog of Formisch + Valibot forms. You own the files. There is
        no UI package to install.
      </p>

      <section className="mt-10 grid gap-3">
        <h2 className="text-xl font-semibold">1. Install peers</h2>
        <p className="text-sm text-muted-foreground">
          Components are unstyled without Tailwind CSS v4. Form state comes from Formisch.
        </p>
        <CodePanel files={[{ path: "terminal", code: install }]} />
      </section>

      <section className="mt-10 grid gap-3">
        <h2 className="text-xl font-semibold">2. Paste tokens and cn()</h2>
        <p className="text-sm text-muted-foreground">
          Put <code className="rounded bg-muted px-1.5 py-0.5">tokens.css</code> next to your
          Tailwind entry and import it. Add the path alias so copied imports resolve.
        </p>
        <CodePanel files={sources.getStarted} />
        <CodePanel
          files={[
            { path: "tsconfig.json", code: alias },
            { path: "vite.config.ts", code: viteAlias },
          ]}
        />
      </section>

      <section className="mt-10 grid gap-3">
        <h2 className="text-xl font-semibold">3. Copy a component or example</h2>
        <p className="text-sm text-muted-foreground">
          Paste files into the same paths shown on each page. Wire fields with Formisch{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">{"<Field>"}</code>. Do not wrap Formisch
          in another form context.
        </p>
      </section>

      <section className="mt-10 grid gap-2 text-sm leading-6">
        <h2 className="text-xl font-semibold">Conventions</h2>
        <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
          <li>Validation runs on submit, then revalidates on input (Formisch defaults).</li>
          <li>
            Validation messages are English strings in the schema. Replace them for your locale.
          </li>
          <li>
            Replace icons in{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">components/ui/icons.tsx</code> if you
            do not want lucide-react.
          </li>
        </ul>
      </section>
    </article>
  );
}
