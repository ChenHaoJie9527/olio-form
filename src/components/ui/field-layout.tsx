import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type FieldSize = "sm" | "md";

type FieldLayoutProps = {
  name: string;
  label?: ReactNode;
  description?: ReactNode;
  required?: boolean;
  errors: [string, ...string[]] | null;
  children: ReactNode;
  className?: string;
};

export function FieldLayout({
  name,
  label,
  description,
  required,
  errors,
  children,
  className,
}: FieldLayoutProps) {
  return (
    <div className={cn("grid gap-1.5", className)}>
      {label ? (
        <label htmlFor={name} className="text-sm font-medium text-foreground">
          {required ? (
            <span className="text-danger" aria-hidden="true">
              {" "}
              *
            </span>
          ) : null}
          {label}
        </label>
      ) : null}
      {description ? (
        <p id={`${name}-description`} className="text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}
      {children}
      {errors ? (
        <p id={`${name}-error`} role="alert" className="text-sm text-danger">
          {errors[0]}
        </p>
      ) : null}
    </div>
  );
}
