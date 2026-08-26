import type { ReactNode } from "react";
import { useFormUi } from "@/components/examples/login/form-context";
import { errorClass } from "@/components/examples/login/styles";

export function FieldFrame({
  name,
  errors,
  label,
  children,
}: {
  name: string;
  errors: [string, ...string[]] | null;
  label?: ReactNode;
  children: ReactNode;
}) {
  const { layout } = useFormUi();
  const error = errors ? (
    <p id={`${name}-error`} role="alert" className={errorClass}>
      {errors[0]}
    </p>
  ) : null;

  if (layout === "horizontal") {
    return (
      <div className="contents">
        {label}
        <div className="grid min-w-0 gap-1">
          {children}
          {error}
        </div>
      </div>
    );
  }

  if (layout === "inline") {
    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          {label}
          {children}
        </div>
        {error}
      </div>
    );
  }

  return (
    <div className="grid gap-1.5">
      {label}
      {children}
      {error}
    </div>
  );
}
