import { Button } from "@base-ui/react/button";
import { LoaderCircle as LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type DefaultButtonProps = Omit<Button.Props, "className"> & {
  className?: string;
  loading?: boolean;
};

export default function DefaultButton({
  className,
  type = "button",
  loading = false,
  disabled,
  focusableWhenDisabled,
  children,
  ...props
}: DefaultButtonProps) {
  return (
    <Button
      type={type}
      disabled={disabled || loading}
      focusableWhenDisabled={loading || focusableWhenDisabled}
      aria-busy={loading || undefined}
      className={cn(
        "inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-transparent bg-primary px-4 text-sm font-medium whitespace-nowrap text-primary-foreground select-none transition-colors outline-none hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {loading ? <LoaderIcon className="size-4 animate-spin" aria-hidden="true" /> : null}
      {children}
    </Button>
  );
}
