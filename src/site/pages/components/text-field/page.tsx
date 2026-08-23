import { TextFieldDemo } from "@/site/pages/components/text-field/demo";
import { DocPage } from "@/site/shared/doc-page";

export function TextFieldDocPage() {
  return (
    <DocPage
      title="TextField"
      description="Native input wired through Formisch Field. Password fields include a visibility toggle."
      preview={<TextFieldDemo />}
    >
      <p className="text-muted-foreground">
        Spread <code className="rounded bg-muted px-1.5 py-0.5">field.props</code> and pass{" "}
        <code className="rounded bg-muted px-1.5 py-0.5">input</code> plus{" "}
        <code className="rounded bg-muted px-1.5 py-0.5">errors</code>. Do not keep a second value
        in local state.
      </p>
    </DocPage>
  );
}
