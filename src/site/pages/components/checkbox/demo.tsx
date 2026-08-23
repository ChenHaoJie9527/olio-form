import { Field, Form, useForm } from "@formisch/react";
import { Checkbox } from "@/components/ui/checkbox";
import { demoSchema } from "@/site/shared/demo-schema";

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
