import { ButtonDemo } from "@/site/pages/components/button/demo";
import { DocPage } from "@/site/shared/doc-page";

export function ButtonDocPage() {
  return (
    <DocPage
      title="Button"
      description="Submit and action button with variant, size, and loading."
      className="max-w-5xl"
      framed={false}
      preview={<ButtonDemo />}
    />
  );
}
