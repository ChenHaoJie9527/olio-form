import { Field, Form, setErrors, useForm } from "@formisch/react";
import type { SubmitEventHandler } from "@formisch/react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TextField } from "@/components/ui/text-field";
import { loginSchema } from "@/components/examples/login/schema";

export function LoginForm() {
  const form = useForm({
    schema: loginSchema,
    initialInput: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit: SubmitEventHandler<typeof loginSchema> = (output) => {
    if (output.email === "blocked@example.com") {
      setErrors(form, {
        path: ["email"],
        errors: ["This email is not registered."],
      });
      return;
    }

    console.log(output);
  };

  return (
    <Form
      of={form}
      onSubmit={onSubmit}
      className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-sm md:p-8"
    >
      <div className="mb-6 grid gap-1">
        <h1 className="text-xl font-semibold tracking-tight text-card-foreground">Sign in</h1>
        <p className="text-sm text-muted-foreground">Enter your email and password to continue.</p>
      </div>

      <div className="grid gap-4">
        <Field of={form} path={["email"]}>
          {(field) => (
            <TextField
              {...field.props}
              input={field.input}
              errors={field.errors}
              type="email"
              label="Email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          )}
        </Field>

        <Field of={form} path={["password"]}>
          {(field) => (
            <TextField
              {...field.props}
              input={field.input}
              errors={field.errors}
              type="password"
              label="Password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          )}
        </Field>

        <div className="flex items-center justify-between gap-3">
          <Field of={form} path={["rememberMe"]}>
            {(field) => (
              <Checkbox
                {...field.props}
                checked={field.input === true}
                errors={field.errors}
                label="Remember me"
              />
            )}
          </Field>
          <a
            href="/forgot-password"
            className="shrink-0 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Forgot password?
          </a>
        </div>
      </div>

      <Button type="submit" className="mt-6 w-full" loading={form.isSubmitting}>
        Sign in
      </Button>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <a href="/register" className="font-medium text-primary underline-offset-4 hover:underline">
          Create one
        </a>
      </p>
    </Form>
  );
}
