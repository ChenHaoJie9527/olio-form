import { buttonBaseClass } from "@/components/ui/button/base";
import { sizeClass } from "@/components/ui/button/size";
import { variantClass } from "@/components/ui/button/variant";
import type { ButtonVariantsProps } from "@/components/ui/button/types";
import { cn } from "@/lib/utils";

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: ButtonVariantsProps = {}) {
  return cn(buttonBaseClass, sizeClass[size], variantClass[variant], className);
}
