import { Button } from "@base-ui/react/button";
import { cn, tw } from "@/lib/utils";

const variantClass = {
  success: tw(
    "border-transparent bg-success text-success-foreground hover:bg-success/90 disabled:hover:bg-success",
  ),
  primary: tw(
    "border-transparent bg-primary text-primary-foreground hover:bg-primary/90 disabled:hover:bg-primary",
  ),
} as const;

const sizeClass = {
  sm: tw("h-9 rounded-sm px-3 text-sm"),
  md: tw("h-11 rounded-sm px-4 text-sm"),
  lg: tw("h-12 rounded-sm px-6 text-base"),
} as const;

const baseClass = tw(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 border font-medium whitespace-nowrap select-none transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
