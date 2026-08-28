import type { InputHTMLAttributes, ReactElement, ReactNode } from "react";
import {
  Field,
  type FormSchema,
  type FormStore,
  type RequiredPath,
  type ValidPath,
} from "@formisch/react";
import type * as v from "valibot";
import { cn } from "@/lib/utils";
import { FieldLayout, type FieldSize } from "@/components/ui/field-layout";
import { CheckIcon } from "@/components/ui/icons";
import { useFormUi } from "@/components/ui/form";

type CheckboxProps<TSchema extends FormSchema, TFieldPath extends RequiredPath> = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "name" | "value" | "defaultValue" | "type" | "size" | "checked"
> & {
  of: FormStore<TSchema>;
  path: ValidPath<v.InferInput<TSchema>, TFieldPath>;
  label: ReactNode;
  description?: string;
  size?: FieldSize;
};

const boxSize: Record<FieldSize, string> = {
  sm: "size-4 rounded",
  md: "size-5 rounded-md",
};

export function Checkbox<TSchema extends FormSchema, TFieldPath extends RequiredPath>({
  of,
  path,
  label,
  description,
  size = "md",
  className,
  required,
  disabled: disabledProp,
  ...props
}: CheckboxProps<TSchema, TFieldPath>): ReactElement {
  const { layout, disabled: formDisabled, requiredMark } = useFormUi();

  return (
    <Field of={of} path={path}>
      {(field) => {
        const disabled = formDisabled || disabledProp;
        const isChecked = field.input === true;
        const describedBy =
          [
            description ? `${field.props.name}-description` : null,
            field.errors ? `${field.props.name}-error` : null,
          ]
            .filter(Boolean)
            .join(" ") || undefined;

        const mark =
          required && requiredMark !== false ? (
            <span className="text-danger" aria-hidden="true">
              *
            </span>
          ) : null;

        const labelText = (
          <span className="leading-5">
            {requiredMark === "before" ? (
              <>
                {mark}
                {mark ? " " : null}
                {label}
              </>
            ) : (
              <>
                {label}
                {mark ? " " : null}
                {mark}
              </>
            )}
          </span>
        );

        return (
          <FieldLayout
            name={field.props.name}
            description={description}
            layout={layout}
            errors={field.errors}
          >
            <label className="flex cursor-pointer items-start gap-3 text-sm text-foreground">
              <span className="relative mt-0.5 inline-flex shrink-0">
                <input
                  {...props}
                  {...field.props}
                  type="checkbox"
                  checked={isChecked}
                  disabled={disabled}
                  required={required}
                  aria-invalid={!!field.errors}
                  aria-describedby={describedBy}
                  className="peer sr-only"
                />
                <span
                  className={cn(
                    "flex items-center justify-center border text-primary-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring/50 peer-disabled:opacity-50",
                    isChecked ? "border-primary bg-primary" : "border-border bg-input",
                    boxSize[size],
                    className,
                  )}
                  aria-hidden="true"
                >
                  {isChecked ? <CheckIcon className="size-3.5" /> : null}
                </span>
              </span>
              {labelText}
            </label>
          </FieldLayout>
        );
      }}
    </Field>
  );
}
