import { Button } from "@base-ui/react/button";
import { cn } from "@/lib/utils";

type SecondaryButtonProps = Omit<Button.Props, "className"> & {
  className?: string;
};

export default function SecondaryButton({
  className,
  type = "button",
  ...props
}: SecondaryButtonProps) {
  return (
    <Button
      type={type}
      className={cn(
        "inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium whitespace-nowrap text-foreground select-none transition-colors outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-card [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}
