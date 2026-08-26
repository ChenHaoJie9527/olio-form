import { RegisterForm } from "@/components/examples/register/register-form";
import { DocPage } from "@/site/shared/doc-page";

export function RegisterDocPage() {
  return (
    <DocPage
      title="Register"
      description="Email, password, confirm password, and a required terms checkbox."
      preview={<RegisterForm />}
    />
  );
}
