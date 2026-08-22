import { LoginForm } from "@/components/examples/login/login-form";
import { DocPage } from "@/site/doc-page";
import { sources } from "@/site/sources";

export function LoginDocPage() {
  return (
    <DocPage
      title="Login"
      description="Email, password, remember me, and a sample server error for blocked@example.com."
      preview={<LoginForm />}
      files={sources.login}
    />
  );
}
