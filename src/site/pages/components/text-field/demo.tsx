import { ExampleCard } from "@/components/common";
import basicCode from "./examples/basic.tsx?raw";
import textFieldSource from "@/components/ui/text-field.tsx?raw";
import TextFieldExample from "./examples/basic";
import utilsSource from "@/lib/utils.ts?raw";
import { useLocale } from "@/site/i18n";

export function TextFieldDemo() {
  const { t } = useLocale();

  return (
    <ExampleCard
      title={t("textFieldTitle")}
      preview={<TextFieldExample />}
      code={basicCode}
      source={textFieldSource}
      layout="flush"
      utils={utilsSource}
    />
  );
}
