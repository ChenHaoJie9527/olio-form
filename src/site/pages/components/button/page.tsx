import { ButtonDemo } from "@/site/pages/components/button/demo";
import { DocPage } from "@/site/shared/doc-page";

export function ButtonDocPage() {
  return (
    <DocPage
      title="Button"
      description="Submit and action button with loading, size, text, and link variants."
      className="max-w-5xl"
      framed={false}
      preview={<ButtonDemo />}
    />
  );
}
