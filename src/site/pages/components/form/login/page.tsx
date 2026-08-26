import { LoginForm } from "@/components/examples/login/login-form";
import { DocPage } from "@/site/shared/doc-page";

export function LoginDocPage() {
  return (
    <DocPage
      title="Login"
      description="Email, password, remember me, and a sample server error for blocked@example.com."
      preview={<LoginForm />}
      className="max-w-6xl"
    />
  );
}
