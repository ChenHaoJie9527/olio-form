import { tw } from "@/lib/utils";
import type { ButtonSize } from "@/components/ui/button/types";

export const sizeClass: Record<ButtonSize, string> = {
  sm: tw("h-9 gap-1.5 rounded-md px-3"),
  md: tw("h-11 gap-2 px-4"),
  lg: tw("h-13 gap-2.5 px-5"),
  icon: tw("size-8 p-0"),
};
