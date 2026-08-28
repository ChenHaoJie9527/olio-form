import { FormDemo } from "@/site/pages/components/form/demo";
import { ApiTable } from "@/site/shared/api-table";
import { DocPage } from "@/site/shared/doc-page";
import { useLocale } from "@/site/i18n";

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
        <div className="mt-6">
          <ApiTable
            rows={[
              { prop: "of", description: t("apiFormOf") },
              { prop: "onSubmit", description: t("apiFormOnSubmit") },
              { prop: "layout", description: t("apiFormLayout") },
              { prop: "disabled", description: t("apiFormDisabled") },
              { prop: "requiredMark", description: t("apiFormRequiredMark") },
            ]}
          />
        </div>
      </section>
    </DocPage>
  );
}
