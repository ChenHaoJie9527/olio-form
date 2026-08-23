import { CheckboxDemo } from "@/site/pages/components/checkbox/demo";
import { DocPage } from "@/site/shared/doc-page";

export function CheckboxDocPage() {
  return (
    <DocPage
      title="Checkbox"
      description="Native checkbox with custom chrome. Formisch reads element.checked."
      preview={<CheckboxDemo />}
    />
  );
}
