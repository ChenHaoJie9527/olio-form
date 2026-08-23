import { FieldLayout } from "@/components/ui/field-layout";

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
