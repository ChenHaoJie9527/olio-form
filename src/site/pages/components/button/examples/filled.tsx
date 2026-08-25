import { Button } from "@base-ui/react/button";
import { cn, tw } from "@/lib/utils";

const variantClass = {
  success: tw(
    "[--filled-bg:oklch(0.73_0.13_165)] [--filled-fg:oklch(0.99_0_0)] dark:[--filled-bg:oklch(0.76_0.12_165)] dark:[--filled-fg:oklch(0.18_0.03_260)]",
  ),
  primary: tw(
    "[--filled-bg:oklch(0.42_0.14_255)] [--filled-fg:oklch(0.99_0_0)] dark:[--filled-bg:oklch(0.72_0.12_255)] dark:[--filled-fg:oklch(0.18_0.03_260)]",
  ),
} as const;

const sizeClass = {
  sm: tw("h-9 rounded-sm px-3 text-sm"),
  md: tw("h-11 rounded-sm px-5 text-sm"),
  lg: tw("h-12 rounded-sm px-7 text-base"),
} as const;

const baseClass = tw(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 border border-transparent bg-(--filled-bg) font-medium text-(--filled-fg) whitespace-nowrap select-none transition-colors outline-none hover:bg-(--filled-bg)/90 focus-visible:ring-2 focus-visible:ring-(--filled-bg)/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-(--filled-bg) dark:focus-visible:ring-offset-neutral-950 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
);

type FilledButtonProps = Omit<Button.Props, "className"> & {
  className?: string;
  variant?: keyof typeof variantClass;
  size?: keyof typeof sizeClass;
};

export default function FilledButton({
  className,
  type = "button",
  variant = "success",
  size = "md",
  ...props
}: FilledButtonProps) {
  return (
    <Button
      type={type}
      className={cn(baseClass, variantClass[variant], sizeClass[size], className)}
      {...props}
    />
  );
}
