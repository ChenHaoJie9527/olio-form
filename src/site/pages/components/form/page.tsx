import { FormDemo } from "@/site/pages/components/form/demo";
import { DocPage } from "@/site/shared/doc-page";
import { useLocale, type Translate } from "@/site/i18n";

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
    <DocPage
      title={t("formTitle")}
      description={t("formLead")}
      className="max-w-5xl"
      framed={false}
      preview={<FormDemo />}
    >
      <section>
        <h2 className="text-xl font-semibold tracking-tight">{t("formApi")}</h2>
        <p className="mt-2 text-muted-foreground">
          {t("formApiLeadBefore")}
          <a
            href="https://formisch.dev/react/api/useForm/"
            className="text-primary underline-offset-4 hover:underline"
          >
            {t("formApiLeadLink")}
          </a>
          {t("formApiLeadAfter")}
        </p>
        <div className="mt-6 overflow-x-auto">
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
      </section>
    </DocPage>
  );
}
