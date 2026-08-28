import { useState, type InputHTMLAttributes, type ReactElement } from "react";
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
import { EyeIcon, EyeOffIcon } from "@/components/ui/icons";
import { useFormUi } from "@/components/ui/form";

type TextFieldProps<TSchema extends FormSchema, TFieldPath extends RequiredPath> = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "name" | "value" | "defaultValue" | "size"
> & {
  of: FormStore<TSchema>;
  path: ValidPath<v.InferInput<TSchema>, TFieldPath>;
  label: string;
  description?: string;
  size?: FieldSize;
};

const sizeClass: Record<FieldSize, string> = {
  sm: "h-9 rounded-sm px-3 text-sm",
  md: "h-11 rounded-sm px-3.5 text-sm",
};

export function TextField<TSchema extends FormSchema, TFieldPath extends RequiredPath>({
  of,
  path,
  label,
  description,
  size = "md",
  className,
  type = "text",
  required,
  disabled: disabledProp,
  ...props
}: TextFieldProps<TSchema, TFieldPath>): ReactElement {
  const { layout, disabled: formDisabled, requiredMark } = useFormUi();
  const [visible, setVisible] = useState(false);

  return (
    <Field of={of} path={path}>
      {(field) => {
        const isPassword = type === "password";
        const disabled = formDisabled || disabledProp;
        const describedBy =
          [
            description ? `${field.props.name}-description` : null,
            field.errors ? `${field.props.name}-error` : null,
          ]
            .filter(Boolean)
            .join(" ") || undefined;

        return (
          <FieldLayout
            name={field.props.name}
            label={label}
            description={description}
            required={required}
            requiredMark={requiredMark}
            layout={layout}
            errors={field.errors}
          >
            <div className={cn("relative min-w-0", layout === "inline" ? "w-52" : "w-full")}>
              <input
                {...props}
                {...field.props}
                id={field.props.name}
                required={required}
                disabled={disabled}
                type={isPassword && visible ? "text" : type}
                value={String(field.input ?? "")}
                aria-invalid={!!field.errors}
                aria-describedby={describedBy}
                className={cn(
                  "w-full border bg-input text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50",
                  field.errors ? "border-danger" : "border-border",
                  isPassword ? "pr-11" : null,
                  sizeClass[size],
                  className,
                )}
              />
              {isPassword ? (
                <button
                  type="button"
                  disabled={disabled}
                  className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground outline-none hover:text-foreground focus-visible:text-foreground disabled:cursor-not-allowed"
                  onClick={() => setVisible((value) => !value)}
                  aria-label={visible ? "Hide password" : "Show password"}
                >
                  {visible ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                </button>
              ) : null}
            </div>
          </FieldLayout>
        );
      }}
    </Field>
  );
}
