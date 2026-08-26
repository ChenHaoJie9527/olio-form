import type { ReactNode } from "react";
import type { FieldElementProps } from "@formisch/react";
import { CheckIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { useFormUi } from "@/components/examples/login/form-context";
import { FieldError } from "@/components/examples/login/field-frame";
import { requiredMarkClass } from "@/components/examples/login/styles";

type CheckboxProps = FieldElementProps & {
  label: ReactNode;
  checked?: boolean;
  errors: [string, ...string[]] | null;
  disabled?: boolean;
  required?: boolean;
};

export function Checkbox({
  label,
  checked,
  errors,
  name,
  disabled: disabledProp,
  required,
  ...props
}: CheckboxProps) {
  const { disabled: formDisabled, requiredMark } = useFormUi();
  const disabled = formDisabled || disabledProp;
  const isChecked = checked === true;
  const describedBy = `${name}-error`;
  const mark = required ? (
    <span className={requiredMarkClass} aria-hidden="true">
      *
    </span>
  ) : null;

  return (
    <div className="grid gap-1.5">
      <label className="flex cursor-pointer items-start gap-3 text-sm text-[oklch(0.22_0.02_260)] has-[:disabled]:cursor-not-allowed dark:text-[oklch(0.96_0.01_80)]">
        <span className="relative mt-0.5 inline-flex shrink-0">
          <input
            {...props}
            id={name}
            name={name}
            type="checkbox"
            checked={isChecked}
            disabled={disabled}
            required={required}
            aria-invalid={!!errors}
            aria-describedby={describedBy}
            className="peer sr-only"
          />
          <span
            className={cn(
              "flex size-5 items-center justify-center rounded-[6px] border text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[#0a60ff]/50 peer-disabled:opacity-50 dark:peer-focus-visible:ring-[#3d7dff]/50",
              isChecked
                ? "border-[#0a60ff] bg-[#0a60ff] dark:border-[#3d7dff] dark:bg-[#3d7dff]"
                : "border-[oklch(0.9_0.012_260)] bg-white dark:border-[oklch(0.32_0.02_260)] dark:bg-[oklch(0.21_0.02_260)]",
            )}
            aria-hidden="true"
          >
            {isChecked ? <CheckIcon className="size-3.5" /> : null}
          </span>
        </span>
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
      </label>
      <FieldError name={name} errors={errors} />
    </div>
  );
}
