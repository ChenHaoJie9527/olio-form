import type { ReactNode } from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cn, tw } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export type ButtonAppearance = "filled" | "ghost" | "outline" | "round";
export type ButtonVariant = "primary" | "secondary" | "neutral";
export type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = Omit<ButtonPrimitive.Props, "className"> & {
  className?: string;
  appearance?: ButtonAppearance;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: boolean;
  children?: ReactNode;
  loadingIcon?: ReactNode;
};

const variantClass = {
  primary: tw(
    "[--btn-bg:#0a60ff] [--btn-hover:#0052f1] [--btn-active:#014ad7] [--btn-disabled:#85b0ff] [--btn-fg:#fff] [--btn-on:#0a60ff]",
  ),
  secondary: tw(
    "[--btn-bg:#4ea959] [--btn-hover:#489c4e] [--btn-active:#3f9041] [--btn-disabled:#9cd3aa] [--btn-fg:#fff] [--btn-on:#4ea959]",
  ),
  neutral: tw(
    "[--btn-bg:#9198a0] [--btn-hover:#858c94] [--btn-active:#7b8086] [--btn-disabled:#b2b7bb] [--btn-fg:#fff] [--btn-on:#9198a0]",
  ),
} as const;

const filledTone = tw(
  "border-transparent bg-(--btn-bg) text-(--btn-fg) hover:bg-(--btn-hover) active:bg-(--btn-active) disabled:bg-(--btn-disabled) disabled:text-(--btn-fg) disabled:opacity-100 disabled:hover:bg-(--btn-disabled)",
);

const appearanceClass = {
  filled: filledTone,
  round: filledTone,
  ghost: tw(
    "border-(--btn-on) bg-transparent text-(--btn-on) hover:bg-(--btn-bg)/10 active:bg-(--btn-bg)/20 disabled:not-aria-busy:opacity-50 disabled:not-aria-busy:hover:bg-transparent",
  ),
  outline: tw(
    "border-(--btn-on) bg-transparent text-(--btn-on) hover:bg-(--btn-bg) hover:text-(--btn-fg) active:bg-(--btn-bg)/90 active:text-(--btn-fg) disabled:not-aria-busy:opacity-50 disabled:not-aria-busy:hover:bg-transparent disabled:not-aria-busy:hover:text-(--btn-on)",
  ),
} as const;

const sizeClass = {
  sm: tw("h-9 px-3 text-sm"),
  md: tw("h-11 px-5 text-sm"),
  lg: tw("h-12 px-7 text-base"),
} as const;

const iconSizeClass = {
  sm: tw("size-9 p-0"),
  md: tw("size-11 p-0"),
  lg: tw("size-12 p-0"),
} as const;

const roundSizeClass = {
  sm: tw("px-4"),
  md: tw("px-6"),
  lg: tw("px-8"),
} as const;

const baseClass = tw(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 border font-medium whitespace-nowrap select-none transition-colors outline-none focus-visible:ring-2 focus-visible:ring-(--btn-on)/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed aria-busy:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
);

export function Button({
  className,
  type = "button",
  appearance = "filled",
  variant = "primary",
  size = "md",
  loading = false,
  icon = false,
  disabled,
  children,
  loadingIcon,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const indicator = loading
    ? (loadingIcon ?? <LoaderCircle className="size-4 animate-spin" aria-hidden />)
    : null;

  return (
    <ButtonPrimitive
      type={type}
      {...props}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(
        baseClass,
        variantClass[variant],
        appearanceClass[appearance],
        sizeClass[size],
        icon ? iconSizeClass[size] : null,
        appearance === "round" ? cn("rounded-full", !icon && roundSizeClass[size]) : "rounded-sm",
        className,
      )}
    >
      {indicator}
      {children}
    </ButtonPrimitive>
  );
}
