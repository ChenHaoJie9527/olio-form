import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useFormUi, type RequiredMark } from "@/components/examples/login/form-context";
import { labelClass, requiredMarkClass } from "@/components/examples/login/styles";

type TextFieldLabelProps = {
  htmlFor?: string;
  required?: boolean;
  requiredMark?: RequiredMark;
  children: ReactNode;
  className?: string;
};

export function TextFieldLabel({
  htmlFor,
  required,
  requiredMark: requiredMarkProp,
  children,
  className,
}: TextFieldLabelProps) {
  const { layout, requiredMark: requiredMarkFromForm } = useFormUi();
  const requiredMark = requiredMarkProp ?? requiredMarkFromForm;
  const mark = required ? (
    <span className={requiredMarkClass} aria-hidden="true">
      *
    </span>
  ) : null;

  return (
    <label
      htmlFor={htmlFor}
      className={cn(labelClass, layout === "horizontal" && "pt-2.5", className)}
    >
      {requiredMark === "before" ? (
        <>
          {mark}
          {mark ? " " : null}
          {children}
        </>
      ) : (
        <>
          {children}
          {mark ? " " : null}
          {mark}
        </>
      )}
    </label>
  );
}
