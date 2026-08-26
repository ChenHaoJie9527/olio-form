import type { ReactNode } from "react";
import { Field, Form, setErrors, useForm } from "@formisch/react";
import type { SubmitEventHandler } from "@formisch/react";
import { loginSchema } from "@/components/examples/login/schema";
import { Checkbox } from "@/components/examples/login/checkbox";
import { FormUiProvider } from "@/components/examples/login/form-provider";
import {
  useFormUi,
  type FormLayout,
  type RequiredMark,
} from "@/components/examples/login/form-context";
import { TextField } from "@/components/examples/login/text-field";
import { submitClass } from "@/components/examples/login/styles";
import { cn } from "@/lib/utils";

export function FormTitle({ title }: { title: string | ReactNode }) {
  return (
    <h1 className="text-xl font-semibold tracking-tight text-[oklch(0.22_0.02_260)] dark:text-[oklch(0.96_0.01_80)]">
      {title}
    </h1>
  );
}

export function FormDescription({ description }: { description: string | ReactNode }) {
  return (
    <p className="text-sm text-[oklch(0.5_0.02_260)] dark:text-[oklch(0.72_0.02_260)]">
      {description}
    </p>
  );
}

export type LoginFormProps = {
  layout?: FormLayout;
  disabled?: boolean;
  requiredMark?: RequiredMark;
};

function LoginFormFields() {
  const form = useForm({
    schema: loginSchema,
    initialInput: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  const { layout, disabled } = useFormUi();

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

  const submitButton = (
    <button
      type="submit"
      disabled={disabled}
      className={cn(submitClass, layout !== "inline" && "mt-6 w-full")}
    >
      Sign in
    </button>
  );

  const forgotLink = (
    <a
      href="/forgot-password"
      className="shrink-0 text-sm font-medium text-[#0a60ff] underline-offset-4 hover:underline dark:text-[#3d7dff]"
    >
      Forgot password?
    </a>
  );

  return (
    <Form
      of={form}
      onSubmit={onSubmit}
      className={cn(
        "w-full rounded-[16px] border border-[oklch(0.9_0.012_260)] bg-white p-6 shadow-sm md:p-8 dark:border-[oklch(0.32_0.02_260)] dark:bg-[oklch(0.21_0.02_260)]",
        layout === "inline" ? "max-w-3xl" : layout === "horizontal" ? "max-w-lg" : "max-w-md",
      )}
    >
      <fieldset disabled={disabled} className="m-0 min-w-0 border-0 p-0">
        <div className="mb-6 grid gap-1">
          <FormTitle title="Sign in" />
          <FormDescription description="Enter your email and password to continue." />
        </div>

        <div
          className={cn(
            layout === "inline" && "flex flex-wrap items-end gap-3",
            layout === "horizontal" &&
              "grid grid-cols-[max-content_minmax(0,1fr)] items-start gap-x-3 gap-y-4",
            layout === "vertical" && "grid gap-4",
          )}
        >
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

          <div
            className={cn(
              "flex items-center gap-3",
              layout === "vertical" && "justify-between",
              layout === "horizontal" && "col-start-2 justify-between",
            )}
          >
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
            {forgotLink}
          </div>

          {layout === "inline" ? submitButton : null}
        </div>

        {layout === "inline" ? null : submitButton}
      </fieldset>
    </Form>
  );
}

export function LoginForm({
  layout = "vertical",
  disabled = false,
  requiredMark = "before",
}: LoginFormProps) {
  return (
    <FormUiProvider layout={layout} disabled={disabled} requiredMark={requiredMark}>
      <LoginFormFields />
    </FormUiProvider>
  );
}
