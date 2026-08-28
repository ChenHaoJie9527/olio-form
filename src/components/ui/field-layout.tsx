import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { FormLayout, RequiredMark } from "@/components/ui/form";

export type FieldSize = "sm" | "md";

type FieldLayoutProps = {
  name: string;
  label?: ReactNode;
  description?: ReactNode;
  required?: boolean;
  requiredMark?: RequiredMark;
  layout?: FormLayout;
  errors: [string, ...string[]] | null;
  children: ReactNode;
  className?: string;
};

export function FieldLayout({
  name,
  label,
  description,
  required,
  requiredMark = "after",
  layout = "vertical",
  errors,
  children,
  className,
}: FieldLayoutProps) {
  const mark =
    required && requiredMark !== false ? (
      <span className="text-danger" aria-hidden="true">
        *
      </span>
    ) : null;

  const labelNode = label ? (
    <label htmlFor={name} className="text-sm font-medium text-foreground">
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
    </label>
  ) : null;

  const descriptionNode = description ? (
    <p id={`${name}-description`} className="text-sm text-muted-foreground">
      {description}
    </p>
  ) : null;

  const errorNode = errors ? (
    <p id={`${name}-error`} role="alert" className="text-sm text-danger">
      {errors[0]}
    </p>
  ) : null;

  if (layout === "horizontal") {
    return (
      <div
        className={cn(
          "grid grid-cols-[max-content_minmax(0,1fr)] items-start gap-x-3 gap-y-1",
          className,
        )}
      >
        {labelNode}
        <div className="grid min-w-0 gap-1.5">
          {descriptionNode}
          {children}
          {errorNode}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-1.5",
        layout === "inline" ? "inline-grid align-top" : null,
        className,
      )}
    >
      {labelNode}
      {descriptionNode}
      {children}
      {errorNode}
    </div>
  );
}
