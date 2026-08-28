import { useState } from "react";
import { useForm } from "@formisch/react";
import type { SubmitEventHandler } from "@formisch/react";
import * as v from "valibot";
import { Form, type FormLayout } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";

const schema = v.object({
  email: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your email."),
    v.email("Please enter a valid email address."),
  ),
});

const layouts: FormLayout[] = ["vertical", "horizontal", "inline"];

export default function LayoutDemo() {
  const [layout, setLayout] = useState<FormLayout>("vertical");
  const form = useForm({
    schema,
    initialInput: { email: "" },
  });

  const onSubmit: SubmitEventHandler<typeof schema> = (output) => {
    console.log(output);
  };

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-2">
        {layouts.map((value) => (
          <Button
            key={value}
            type="button"
            size="sm"
            appearance={layout === value ? "filled" : "outline"}
            onClick={() => setLayout(value)}
          >
            {value}
          </Button>
        ))}
      </div>
      <Form of={form} layout={layout} onSubmit={onSubmit} className="max-w-lg">
        <div className={layout === "inline" ? "flex flex-wrap items-end gap-3" : "grid gap-4"}>
          <TextField
            of={form}
            path={["email"]}
            label="Email"
            type="email"
            placeholder="you@example.com"
            required
          />
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </div>
  );
}
