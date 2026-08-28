import { TextFieldDemo } from "@/site/pages/components/text-field/demo";
import { ApiTable } from "@/site/shared/api-table";
import { DocPage } from "@/site/shared/doc-page";
import { useLocale } from "@/site/i18n";

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
        <div className="mt-6">
          <ApiTable
            rows={[
              { prop: "of", description: t("apiFieldOf") },
              { prop: "path", description: t("apiFieldPathEmail") },
              { prop: "label", description: t("apiFieldLabel") },
              { prop: "required", description: t("apiFieldRequired") },
            ]}
          />
        </div>
      </section>
    </DocPage>
  );
}
