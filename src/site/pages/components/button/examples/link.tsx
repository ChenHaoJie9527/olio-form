import { Button } from "@base-ui/react/button";
import { cn } from "@/lib/utils";

type LinkButtonProps = Omit<Button.Props, "className"> & {
  className?: string;
};

export default function LinkButton({ className, type = "button", ...props }: LinkButtonProps) {
  return (
    <Button
      type={type}
      className={cn(
        "inline-flex h-auto shrink-0 cursor-pointer items-center justify-center gap-1 rounded-lg border-none bg-transparent px-0 text-sm font-medium whitespace-nowrap text-primary select-none transition-colors outline-none underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:no-underline [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}
