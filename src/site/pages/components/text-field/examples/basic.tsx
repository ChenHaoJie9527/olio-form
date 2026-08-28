import { useForm } from "@formisch/react";
import type { SubmitEventHandler } from "@formisch/react";
import * as v from "valibot";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";

const schema = v.object({
  email: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your email."),
    v.email("Please enter a valid email address."),
  ),
});

export default function TextFieldExample() {
  const form = useForm({
    schema,
    initialInput: { email: "" },
  });

  const onSubmit: SubmitEventHandler<typeof schema> = (output) => {
    console.log(output);
  };

  return (
    <Form of={form} onSubmit={onSubmit} className="max-w-md">
      <TextField
        of={form}
        path={["email"]}
        label="Email"
        type="email"
        placeholder="you@example.com"
        required
      />
    </Form>
  );
}
