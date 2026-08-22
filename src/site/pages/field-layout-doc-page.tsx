import { FieldLayoutDemo } from "@/site/demos";
import { DocPage } from "@/site/doc-page";
import { sources } from "@/site/sources";

export function FieldLayoutDocPage() {
  return (
    <DocPage
      title="FieldLayout"
      description="Label, description, and error chrome shared by every field."
      preview={<FieldLayoutDemo />}
      files={sources.fieldLayout}
    />
  );
}
