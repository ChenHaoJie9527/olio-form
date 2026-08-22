import { RegisterForm } from "@/components/examples/register/register-form";
import { DocPage } from "@/site/doc-page";
import { sources } from "@/site/sources";

export function RegisterDocPage() {
  return (
    <DocPage
      title="Register"
      description="Email, password, confirm password, and a required terms checkbox."
      preview={<RegisterForm />}
      files={sources.register}
    />
  );
}
