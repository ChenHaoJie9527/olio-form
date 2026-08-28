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
import { useLocale, type Translate } from "@/site/i18n";

const kitFiles = [
  { path: "components/ui/form.tsx", code: formSource },
  { path: "components/ui/text-field.tsx", code: textFieldSource },
  { path: "components/ui/checkbox.tsx", code: checkboxSource },
  { path: "components/ui/field-layout.tsx", code: fieldLayoutSource },
  { path: "components/ui/button.tsx", code: buttonSource },
  { path: "components/ui/icons.tsx", code: iconsSource },
  { path: "lib/utils.ts", code: utilsSource },
] as const;

function KitFileRow({ path, code, t }: { path: string; code: string; t: Translate }) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-2.5">
      <p className="truncate font-mono text-sm text-muted-foreground">{path}</p>
      <ExamplesDrawer
        title={path}
        description={t("kitFileDescription")}
        trigger={
          <button
            type="button"
            className="inline-flex h-8 shrink-0 items-center rounded-md px-2 text-sm text-muted-foreground hover:text-foreground"
            aria-label={t("viewFile", { path })}
          >
            {t("viewCode")}
          </button>
        }
      >
        <CodeBlock code={code} />
      </ExamplesDrawer>
    </div>
  );
}

function ApiHead({ t }: { t: Translate }) {
  return (
    <thead>
      <tr className="border-b border-border">
        <th className="py-2 pr-4 font-medium">{t("apiProp")}</th>
        <th className="py-2 pr-4 font-medium">{t("apiDescription")}</th>
      </tr>
    </thead>
  );
}

export function FormDocPage() {
  const { t } = useLocale();

  return (
    <article className="mx-auto w-full min-w-0 max-w-5xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">{t("formTitle")}</h1>
      <p className="mt-2 text-muted-foreground">{t("formLead")}</p>

      <nav className="mt-8 flex flex-wrap gap-3 text-sm">
        <a href="#copy-the-kit" className="text-primary underline-offset-4 hover:underline">
          {t("formTocKit")}
        </a>
        {formDemos.map((demo) => (
          <a
            key={demo.id}
            href={`#form-demo-${demo.id}`}
            className="text-primary underline-offset-4 hover:underline"
          >
            {t(demo.titleKey)}
          </a>
        ))}
        <a href="#api" className="text-primary underline-offset-4 hover:underline">
          {t("formTocApi")}
        </a>
      </nav>

      <section id="when-to-use" className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">{t("formWhenToUse")}</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>{t("formWhenToUse1")}</li>
          <li>{t("formWhenToUse2")}</li>
        </ul>
      </section>

      <section id="copy-the-kit" className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">{t("formCopyTheKit")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("formCopyTheKitLead")}</p>
        <pre className="mt-4 max-w-full overflow-x-auto rounded-xl border border-border bg-muted/40 p-4 text-sm">
          <code>
            pnpm add @formisch/react valibot @base-ui/react lucide-react clsx tailwind-merge
          </code>
        </pre>
        <div className="mt-6 grid min-w-0 gap-3">
          {kitFiles.map((file) => (
            <KitFileRow key={file.path} path={file.path} code={file.code} t={t} />
          ))}
        </div>
      </section>

      <section id="examples" className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">{t("formExamples")}</h2>
        <div className="mt-6 grid gap-8">
          {formDemos.map((demo) => {
            const Preview = demo.Component;
            const title = t(demo.titleKey);
            return (
              <div key={demo.id} id={`form-demo-${demo.id}`}>
                <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t(demo.descriptionKey)}</p>
                <div className="mt-4">
                  <ExampleCard
                    title={title}
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
        <h2 className="text-xl font-semibold tracking-tight">{t("formApi")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("formApiLeadBefore")}
          <a
            href="https://formisch.dev/react/api/useForm/"
            className="text-primary underline-offset-4 hover:underline"
          >
            {t("formApiLeadLink")}
          </a>
          {t("formApiLeadAfter")}
        </p>

        <h3 className="mt-8 text-base font-semibold">Form</h3>
        <div className="mt-3 overflow-x-auto text-sm">
          <table className="w-full border-collapse text-left">
            <ApiHead t={t} />
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">of</td>
                <td className="py-2">{t("apiFormOf")}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">onSubmit</td>
                <td className="py-2">{t("apiFormOnSubmit")}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">layout</td>
                <td className="py-2">{t("apiFormLayout")}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">disabled</td>
                <td className="py-2">{t("apiFormDisabled")}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">requiredMark</td>
                <td className="py-2">{t("apiFormRequiredMark")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-8 text-base font-semibold">TextField</h3>
        <div className="mt-3 overflow-x-auto text-sm">
          <table className="w-full border-collapse text-left">
            <ApiHead t={t} />
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">of</td>
                <td className="py-2">{t("apiFieldOf")}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">path</td>
                <td className="py-2">{t("apiFieldPathEmail")}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">label</td>
                <td className="py-2">{t("apiFieldLabel")}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">required</td>
                <td className="py-2">{t("apiFieldRequired")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-8 text-base font-semibold">Checkbox</h3>
        <div className="mt-3 overflow-x-auto text-sm">
          <table className="w-full border-collapse text-left">
            <ApiHead t={t} />
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">of</td>
                <td className="py-2">{t("apiFieldOf")}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">path</td>
                <td className="py-2">{t("apiFieldPath")}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">label</td>
                <td className="py-2">{t("apiFieldLabel")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
