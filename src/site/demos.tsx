import { Field, Form, useForm } from "@formisch/react";
import * as v from "valibot";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldLayout } from "@/components/ui/field-layout";
import { TextField } from "@/components/ui/text-field";
import { CloseIcon, PlusIcon } from "@/components/ui/icons";

const demoSchema = v.object({
  email: v.pipe(v.string(), v.email("Please enter a valid email address.")),
  password: v.pipe(v.string(), v.minLength(8, "Password must be at least 8 characters.")),
  newsletter: v.boolean(),
});

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

export function CheckboxDemo() {
  const form = useForm({
    schema: demoSchema,
    initialInput: { email: "", password: "", newsletter: false },
  });

  return (
    <Form of={form} onSubmit={() => undefined} className="w-full max-w-sm">
      <Field of={form} path={["newsletter"]}>
        {(field) => (
          <Checkbox
            {...field.props}
            checked={field.input === true}
            errors={field.errors}
            label="Send me product updates"
          />
        )}
      </Field>
    </Form>
  );
}

export function FieldLayoutDemo() {
  return (
    <div className="w-full max-w-sm">
      <FieldLayout
        name="username"
        label="Username"
        description="This is how FieldLayout wraps label, hint, and errors."
        errors={["This name is already taken."]}
        required
      >
        <input
          id="username"
          name="username"
          aria-invalid
          aria-describedby="username-description username-error"
          className="h-11 w-full rounded-lg border border-danger bg-input px-3.5 text-sm outline-none"
          defaultValue="olio"
        />
      </FieldLayout>
    </div>
  );
}

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="text">Text</Button>
      <Button variant="link">Link</Button>
      <Button loading>Saving</Button>
      <Button size="icon" aria-label="close">
        <CloseIcon />
      </Button>
      <Button icon={<PlusIcon />}>Add</Button>
    </div>
  );
}
