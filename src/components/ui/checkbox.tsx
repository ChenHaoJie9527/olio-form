import type { InputHTMLAttributes, ReactNode } from "react";
import type { FieldElementProps } from "@formisch/react";
import { cn } from "@/lib/utils";
import { FieldLayout, type FieldSize } from "@/components/ui/field-layout";
import { CheckIcon } from "@/components/ui/icons";

type CheckboxProps = FieldElementProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof FieldElementProps | "size" | "type"> & {
    label: ReactNode;
    description?: string;
    errors: [string, ...string[]] | null;
    checked?: boolean;
    size?: FieldSize;
  };

const boxSize: Record<FieldSize, string> = {
  sm: "size-4 rounded",
  md: "size-5 rounded-md",
};

export function Checkbox({
  label,
  description,
  errors,
  checked,
  size = "md",
  className,
  ...props
}: CheckboxProps) {
  const isChecked = checked === true;
  const describedBy =
    [description ? `${props.name}-description` : null, errors ? `${props.name}-error` : null]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <FieldLayout name={props.name} description={description} errors={errors}>
      <label className="flex cursor-pointer items-start gap-3 text-sm text-foreground">
        <span className="relative mt-0.5 inline-flex shrink-0">
          <input
            {...props}
            type="checkbox"
            checked={isChecked}
            aria-invalid={!!errors}
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
        <span className="leading-5">{label}</span>
      </label>
    </FieldLayout>
  );
}
