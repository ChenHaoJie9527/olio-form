import { useState, type InputHTMLAttributes } from "react";
import type { FieldElementProps } from "@formisch/react";
import { cn } from "@/lib/utils";
import { FieldLayout, type FieldSize } from "@/components/ui/field-layout";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icons";

type TextFieldProps = FieldElementProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof FieldElementProps | "size"> & {
    label?: string;
    description?: string;
    errors: [string, ...string[]] | null;
    input?: string | number | undefined;
    size?: FieldSize;
  };

const sizeClass: Record<FieldSize, string> = {
  sm: "h-9 rounded-md px-3 text-sm",
  md: "h-11 rounded-lg px-3.5 text-sm",
};

export function TextField({
  label,
  description,
  errors,
  input,
  size = "md",
  className,
  type = "text",
  required,
  ...props
}: TextFieldProps) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const describedBy =
    [description ? `${props.name}-description` : null, errors ? `${props.name}-error` : null]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <FieldLayout
      name={props.name}
      label={label}
      description={description}
      required={required}
      errors={errors}
    >
      <div className="relative">
        <input
          {...props}
          required={required}
          type={isPassword && visible ? "text" : type}
          value={input ?? ""}
          aria-invalid={!!errors}
          aria-describedby={describedBy}
          className={cn(
            "w-full border bg-input text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50",
            errors ? "border-danger" : "border-border",
            isPassword ? "pr-11" : null,
            sizeClass[size],
            className,
          )}
        />
        {isPassword ? (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground outline-none hover:text-foreground focus-visible:text-foreground"
            onClick={() => setVisible((value) => !value)}
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
          </button>
        ) : null}
      </div>
    </FieldLayout>
  );
}
