import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { LoaderIcon } from "@/components/ui/icons";
import type { FieldSize } from "@/components/ui/field-layout";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: FieldSize;
  loading?: boolean;
};

const sizeClass: Record<FieldSize, string> = {
  sm: "h-9 rounded-md px-3 text-sm",
  md: "h-11 rounded-lg px-4 text-sm",
};

const variantClass = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 disabled:hover:bg-primary",
  secondary: "border border-border bg-card text-foreground hover:bg-muted disabled:hover:bg-card",
  ghost: "text-foreground hover:bg-muted disabled:hover:bg-transparent",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        sizeClass[size],
        variantClass[variant],
        className,
      )}
      {...props}
    >
      {loading ? <LoaderIcon className="size-4 animate-spin" aria-hidden="true" /> : null}
      {children}
    </button>
  );
}
