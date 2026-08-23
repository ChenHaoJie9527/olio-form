import { FieldLayoutDemo } from "@/site/pages/components/field-layout/demo";
import { DocPage } from "@/site/shared/doc-page";

export function FieldLayoutDocPage() {
  return (
    <DocPage
      title="FieldLayout"
      description="Label, description, and error chrome shared by every field."
      preview={<FieldLayoutDemo />}
    />
  );
}
