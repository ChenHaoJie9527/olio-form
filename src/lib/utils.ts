import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Tailwind IntelliSense helper. Keep class strings inside `tw()` so the editor can autocomplete. */
export function tw(className: string) {
  return className;
}
