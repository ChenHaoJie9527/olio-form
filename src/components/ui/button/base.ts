import { tw } from "@/lib/utils";

export const buttonBaseClass = tw(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border border-transparent text-sm font-medium whitespace-nowrap select-none transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
);
