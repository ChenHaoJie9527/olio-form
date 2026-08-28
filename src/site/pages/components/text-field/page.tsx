import { TextFieldDemo } from "@/site/pages/components/text-field/demo";
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

export function TextFieldDocPage() {
  const { t } = useLocale();

  return (
    <DocPage
      title={t("textFieldTitle")}
      description={t("textFieldDescription")}
      className="max-w-5xl"
      framed={false}
      preview={<TextFieldDemo />}
    >
      <section>
        <h2 className="text-xl font-semibold tracking-tight">{t("formApi")}</h2>
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
      </section>
    </DocPage>
  );
}
