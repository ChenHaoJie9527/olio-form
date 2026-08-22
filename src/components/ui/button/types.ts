export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive" | "text" | "link";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

export type ButtonVariantsProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};
