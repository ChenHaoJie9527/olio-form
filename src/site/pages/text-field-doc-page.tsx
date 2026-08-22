import { TextFieldDemo } from "@/site/demos";
import { DocPage } from "@/site/doc-page";
import { sources } from "@/site/sources";

export function TextFieldDocPage() {
  return (
    <DocPage
      title="TextField"
      description="Native input wired through Formisch Field. Password fields include a visibility toggle."
      preview={<TextFieldDemo />}
      files={sources.textField}
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
