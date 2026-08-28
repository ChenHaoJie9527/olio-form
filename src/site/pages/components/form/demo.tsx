import { ExampleCard } from "@/components/common";
import basicCode from "./demos/basic.tsx?raw";
import layoutCode from "./demos/layout.tsx?raw";
import formSource from "@/components/ui/form.tsx?raw";
import BasicDemo from "./demos/basic";
import LayoutDemo from "./demos/layout";
import utilsSource from "@/lib/utils.ts?raw";
import { useLocale, type MessageKey } from "@/site/i18n";

const formKits = [
  {
    titleKey: "formKitBasic" satisfies MessageKey,
    preview: <BasicDemo />,
    code: basicCode,
    source: formSource,
  },
  {
    titleKey: "formKitLayout" satisfies MessageKey,
    preview: <LayoutDemo />,
    code: layoutCode,
    source: formSource,
  },
] as const;

export function FormDemo() {
  const { t } = useLocale();

  return (
    <div className="grid gap-4">
      {formKits.map((kit) => (
        <ExampleCard
          key={kit.titleKey}
          title={t(kit.titleKey)}
          preview={kit.preview}
          code={kit.code}
          source={kit.source}
          layout="flush"
          utils={utilsSource}
        />
      ))}
    </div>
  );
}
