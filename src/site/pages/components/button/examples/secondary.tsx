import { Button } from "@base-ui/react/button";
import { cn, tw } from "@/lib/utils";

const variantClass = {
  default: tw("border-border bg-card text-foreground hover:bg-muted disabled:hover:bg-card"),
  destructive: tw("border-danger bg-card text-danger hover:bg-danger/10 disabled:hover:bg-card"),
} as const;

const sizeClass = {
  sm: tw("h-9 rounded-md px-3 text-sm"),
  md: tw("h-11 rounded-lg px-4 text-sm"),
  lg: tw("h-12 rounded-lg px-6 text-base"),
} as const;

const baseClass = tw(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 border font-medium whitespace-nowrap select-none transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
);

type SecondaryButtonProps = Omit<Button.Props, "className"> & {
  className?: string;
  variant?: keyof typeof variantClass;
  size?: keyof typeof sizeClass;
};

export default function SecondaryButton({
  className,
  type = "button",
  variant = "default",
  size = "md",
  ...props
}: SecondaryButtonProps) {
  return (
    <Button
      type={type}
      className={cn(baseClass, variantClass[variant], sizeClass[size], className)}
      {...props}
    />
  );
}
