import { Field, Form, useForm } from "@formisch/react";
import type { SubmitEventHandler } from "@formisch/react";
import DefaultButton from "@/site/pages/components/button/examples/default";
import { Checkbox } from "@/components/ui/checkbox";
import { TextField } from "@/components/ui/text-field";
import { registerSchema } from "@/components/examples/register/schema";

export function RegisterForm() {
  const form = useForm({
    schema: registerSchema,
    initialInput: {
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit: SubmitEventHandler<typeof registerSchema> = (output) => {
    console.log(output);
  };

  return (
    <Form
      of={form}
      onSubmit={onSubmit}
      className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-sm md:p-8"
    >
      <div className="mb-6 grid gap-1">
        <h1 className="text-xl font-semibold tracking-tight text-card-foreground">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Start with your email. You can change these messages in the schema.
        </p>
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
              autoComplete="new-password"
              required
            />
          )}
        </Field>

        <Field of={form} path={["confirmPassword"]}>
          {(field) => (
            <TextField
              {...field.props}
              input={field.input}
              errors={field.errors}
              type="password"
              label="Confirm password"
              placeholder="••••••••"
              autoComplete="new-password"
              required
            />
          )}
        </Field>

        <Field of={form} path={["terms"]}>
          {(field) => (
            <Checkbox
              {...field.props}
              checked={field.input === true}
              errors={field.errors}
              required
              label={
                <>
                  I agree to the{" "}
                  <a
                    href="/terms"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    terms and conditions
                  </a>
                </>
              }
            />
          )}
        </Field>
      </div>

      <DefaultButton type="submit" className="mt-6 w-full" loading={form.isSubmitting}>
        Create account
      </DefaultButton>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <a href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
          Sign in
        </a>
      </p>
    </Form>
  );
}
