import { ButtonDemo } from "@/site/pages/components/button/demo";
import { DocPage } from "@/site/shared/doc-page";
import { useLocale } from "@/site/i18n";

export function ButtonDocPage() {
  const { t } = useLocale();

  return (
    <DocPage
      title={t("buttonTitle")}
      description={t("buttonDescription")}
      className="max-w-5xl"
      framed={false}
      preview={<ButtonDemo />}
    />
  );
}
