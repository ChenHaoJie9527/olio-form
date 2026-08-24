import { Button } from "@base-ui/react/button";
import { cn, tw } from "@/lib/utils";

const variantClass = {
  default: tw("text-primary hover:underline disabled:hover:no-underline"),
  destructive: tw("text-danger hover:underline disabled:hover:no-underline"),
} as const;

const sizeClass = {
  sm: tw("text-xs"),
  md: tw("text-sm"),
  lg: tw("text-base"),
} as const;

const baseClass = tw(
  "inline-flex h-auto shrink-0 cursor-pointer items-center justify-center gap-1 rounded-lg border-none bg-transparent px-0 font-medium whitespace-nowrap select-none transition-colors outline-none underline-offset-4 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
);

type LinkButtonProps = Omit<Button.Props, "className"> & {
  className?: string;
  variant?: keyof typeof variantClass;
  size?: keyof typeof sizeClass;
};

export default function LinkButton({
  className,
  type = "button",
  variant = "default",
  size = "md",
  ...props
}: LinkButtonProps) {
  return (
    <Button
      type={type}
      className={cn(baseClass, variantClass[variant], sizeClass[size], className)}
      {...props}
    />
  );
}
