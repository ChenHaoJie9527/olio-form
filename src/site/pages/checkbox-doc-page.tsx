import { CheckboxDemo } from "@/site/demos";
import { DocPage } from "@/site/doc-page";
import { sources } from "@/site/sources";

export function CheckboxDocPage() {
  return (
    <DocPage
      title="Checkbox"
      description="Native checkbox with custom chrome. Formisch reads element.checked."
      preview={<CheckboxDemo />}
      files={sources.checkbox}
    />
  );
}
