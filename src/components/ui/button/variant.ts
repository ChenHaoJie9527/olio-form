import { tw } from "@/lib/utils";
import type { ButtonVariant } from "@/components/ui/button/types";

export const variantClass: Record<ButtonVariant, string> = {
  primary: tw("bg-primary text-primary-foreground hover:bg-primary/90 disabled:hover:bg-primary"),
  secondary: tw("border-border bg-card text-foreground hover:bg-muted disabled:hover:bg-card"),
  ghost: tw("hover:bg-muted disabled:hover:bg-transparent"),
  destructive: tw("bg-danger text-white hover:bg-danger/90 disabled:hover:bg-danger"),
  text: tw(
    "bg-transparent text-foreground hover:text-foreground/70 disabled:hover:text-foreground border-none",
  ),
  link: tw(
    "h-auto gap-1 bg-transparent px-0 text-primary underline-offset-4 hover:underline border-none disabled:hover:no-underline",
  ),
};
