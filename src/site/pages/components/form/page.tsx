import { ExampleCard } from "@/components/common";
import { CodeBlock } from "@/components/common/code-block";
import { ExamplesDrawer } from "@/components/common/examples-drawer";
import { formDemos } from "@/site/pages/components/form/demos";
import formSource from "@/components/ui/form.tsx?raw";
import textFieldSource from "@/components/ui/text-field.tsx?raw";
import checkboxSource from "@/components/ui/checkbox.tsx?raw";
import fieldLayoutSource from "@/components/ui/field-layout.tsx?raw";
import buttonSource from "@/components/ui/button.tsx?raw";
import iconsSource from "@/components/ui/icons.tsx?raw";
import utilsSource from "@/lib/utils.ts?raw";

const kitFiles = [
  { path: "components/ui/form.tsx", code: formSource },
  { path: "components/ui/text-field.tsx", code: textFieldSource },
  { path: "components/ui/checkbox.tsx", code: checkboxSource },
  { path: "components/ui/field-layout.tsx", code: fieldLayoutSource },
  { path: "components/ui/button.tsx", code: buttonSource },
  { path: "components/ui/icons.tsx", code: iconsSource },
  { path: "lib/utils.ts", code: utilsSource },
] as const;

function KitFileRow({ path, code }: { path: string; code: string }) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-2.5">
      <p className="truncate font-mono text-sm text-muted-foreground">{path}</p>
      <ExamplesDrawer
        title={path}
        description="Copy this file into the same path in your app."
        trigger={
          <button
            type="button"
            className="inline-flex h-8 shrink-0 items-center rounded-md px-2 text-sm text-muted-foreground hover:text-foreground"
            aria-label={`View ${path}`}
          >
            View code
          </button>
        }
      >
        <CodeBlock code={code} />
      </ExamplesDrawer>
    </div>
  );
}

export function FormDocPage() {
  return (
    <article className="mx-auto w-full min-w-0 max-w-5xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Form</h1>
      <p className="mt-2 text-muted-foreground">
        Copy-paste form UI for Formisch and Valibot. You own the files.
      </p>

      <nav className="mt-8 flex flex-wrap gap-3 text-sm">
        <a href="#copy-the-kit" className="text-primary underline-offset-4 hover:underline">
          Copy the kit
        </a>
        {formDemos.map((demo) => (
          <a
            key={demo.id}
            href={`#form-demo-${demo.id}`}
            className="text-primary underline-offset-4 hover:underline"
          >
            {demo.title}
          </a>
        ))}
        <a href="#api" className="text-primary underline-offset-4 hover:underline">
          API
        </a>
      </nav>

      <section id="when-to-use" className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">When to use</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Collecting values that must match a Valibot schema before submit.</li>
          <li>Building a form from copy-paste fields wired to Formisch.</li>
        </ul>
      </section>

      <section id="copy-the-kit" className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">Copy the kit</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Install peers, then copy these files into the same paths in your app.
        </p>
        <pre className="mt-4 max-w-full overflow-x-auto rounded-xl border border-border bg-muted/40 p-4 text-sm">
          <code>pnpm add @formisch/react valibot @base-ui/react lucide-react clsx tailwind-merge</code>
        </pre>
        <div className="mt-6 grid min-w-0 gap-3">
          {kitFiles.map((file) => (
            <KitFileRow key={file.path} path={file.path} code={file.code} />
          ))}
        </div>
      </section>

      <section id="examples" className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>
        <div className="mt-6 grid gap-8">
          {formDemos.map((demo) => {
            const Preview = demo.Component;
            return (
              <div key={demo.id} id={`form-demo-${demo.id}`}>
                <h3 className="text-lg font-semibold tracking-tight">{demo.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{demo.description}</p>
                <div className="mt-4">
                  <ExampleCard
                    title={demo.title}
                    preview={<Preview />}
                    code={demo.code}
                    layout="flush"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="api" className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">API</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Create the store with{" "}
          <a
            href="https://formisch.dev/react/api/useForm/"
            className="text-primary underline-offset-4 hover:underline"
          >
            Formisch useForm
          </a>
          . Do not wrap it.
        </p>

        <h3 className="mt-8 text-base font-semibold">Form</h3>
        <div className="mt-3 overflow-x-auto text-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 pr-4 font-medium">Prop</th>
                <th className="py-2 pr-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">of</td>
                <td className="py-2">Formisch form store. Passed through.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">onSubmit</td>
                <td className="py-2">Formisch submit handler. Passed through.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">layout</td>
                <td className="py-2">vertical (default) | horizontal | inline</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">disabled</td>
                <td className="py-2">Disables fields in this form. Default false.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">requiredMark</td>
                <td className="py-2">before | after (default) | false</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-8 text-base font-semibold">TextField</h3>
        <div className="mt-3 overflow-x-auto text-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 pr-4 font-medium">Prop</th>
                <th className="py-2 pr-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">of</td>
                <td className="py-2">Formisch form store.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">path</td>
                <td className="py-2">Formisch path tuple, e.g. [&quot;email&quot;].</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">label</td>
                <td className="py-2">Required.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">required</td>
                <td className="py-2">
                  Asterisk and ARIA only. Submit validity comes from the schema.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-8 text-base font-semibold">Checkbox</h3>
        <div className="mt-3 overflow-x-auto text-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 pr-4 font-medium">Prop</th>
                <th className="py-2 pr-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">of</td>
                <td className="py-2">Formisch form store.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">path</td>
                <td className="py-2">Formisch path tuple.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">label</td>
                <td className="py-2">Required.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
