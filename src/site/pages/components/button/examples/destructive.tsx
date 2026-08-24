import { Button } from "@base-ui/react/button";
import { cn } from "@/lib/utils";

type DestructiveButtonProps = Omit<Button.Props, "className"> & {
  className?: string;
};

export default function DestructiveButton({
  className,
  type = "button",
  ...props
}: DestructiveButtonProps) {
  return (
    <Button
      type={type}
      className={cn(
        "inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-transparent bg-danger px-4 text-sm font-medium whitespace-nowrap text-white select-none transition-colors outline-none hover:bg-danger/90 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-danger [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}
