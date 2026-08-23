import { Field, Form, useForm } from "@formisch/react";
import { TextField } from "@/components/ui/text-field";
import { demoSchema } from "@/site/shared/demo-schema";

export function TextFieldDemo() {
  const form = useForm({
    schema: demoSchema,
    initialInput: { email: "", password: "", newsletter: false },
  });

  return (
    <Form of={form} onSubmit={() => undefined} className="grid w-full max-w-sm gap-4">
      <Field of={form} path={["email"]}>
        {(field) => (
          <TextField
            {...field.props}
            input={field.input}
            errors={field.errors}
            type="email"
            label="Email"
            placeholder="you@example.com"
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
            required
          />
        )}
      </Field>
    </Form>
  );
}
