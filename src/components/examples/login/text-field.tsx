import { useState, type InputHTMLAttributes } from "react";
import type { FieldElementProps } from "@formisch/react";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { FieldFrame } from "@/components/examples/login/field-frame";
import { useFormUi } from "@/components/examples/login/form-context";
import { TextFieldLabel } from "@/components/examples/login/text-field-label";
import { inputClass, inputErrorClass, inputOkClass } from "@/components/examples/login/styles";

type TextFieldProps = FieldElementProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof FieldElementProps> & {
    label: string;
    errors: [string, ...string[]] | null;
    input?: string | undefined;
  };

export function TextField({
  label,
  errors,
  input,
  type = "text",
  required,
  name,
  className,
  disabled: disabledProp,
  ...props
}: TextFieldProps) {
  const { layout, disabled: formDisabled } = useFormUi();
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const disabled = formDisabled || disabledProp;
  const describedBy = `${name}-error`;

  const control = (
    <div className={cn("relative min-w-0", layout === "inline" ? "w-52" : "w-full")}>
      <input
        {...props}
        id={name}
        name={name}
        required={required}
        disabled={disabled}
        type={isPassword && visible ? "text" : type}
        value={input ?? ""}
        aria-invalid={!!errors}
        aria-describedby={describedBy}
        className={cn(
          inputClass,
          errors ? inputErrorClass : inputOkClass,
          isPassword && "pr-11",
          className,
        )}
      />
      {isPassword ? (
        <button
          type="button"
          disabled={disabled}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-[oklch(0.5_0.02_260)] outline-none hover:text-[oklch(0.22_0.02_260)] focus-visible:text-[oklch(0.22_0.02_260)] disabled:cursor-not-allowed dark:text-[oklch(0.72_0.02_260)] dark:hover:text-[oklch(0.96_0.01_80)] dark:focus-visible:text-[oklch(0.96_0.01_80)]"
          onClick={() => setVisible((value) => !value)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
        </button>
      ) : null}
    </div>
  );

  const fieldLabel = (
    <TextFieldLabel htmlFor={name} required={required}>
      {label}
    </TextFieldLabel>
  );

  return (
    <FieldFrame name={name} errors={errors} label={fieldLabel}>
      {control}
    </FieldFrame>
  );
}
