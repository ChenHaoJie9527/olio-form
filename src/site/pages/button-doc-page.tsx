import { ButtonDemo } from "@/site/demos";
import { DocPage } from "@/site/doc-page";
import { sources } from "@/site/sources";

export function ButtonDocPage() {
  return (
    <DocPage
      title="Button"
      description="Submit and action button with loading, size, text, and link variants."
      preview={<ButtonDemo />}
      files={sources.button}
    />
  );
}
