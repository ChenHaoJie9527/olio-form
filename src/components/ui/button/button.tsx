import type { ButtonHTMLAttributes, ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button/variants";
import type { ButtonVariantsProps } from "@/components/ui/button/types";
import { LoaderIcon } from "@/components/ui/icons";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariantsProps & {
    loading?: boolean;
    icon?: ReactNode;
  };

export function Button({
  type = "button",
  variant = "primary",
  size = "md",
  className,
  loading = false,
  icon,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      data-slot="button"
      {...props}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonVariants({ variant, size, className })}
    >
      {loading ? (
        <LoaderIcon className="size-4 animate-spin" aria-hidden="true" />
      ) : icon ? (
        <span className="inline-flex" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {children}
    </button>
  );
}
