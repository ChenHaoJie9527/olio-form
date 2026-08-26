import { tw } from "@/lib/utils";

export const labelClass = tw(
  "text-sm font-medium text-[oklch(0.22_0.02_260)] dark:text-[oklch(0.96_0.01_80)]",
);

export const requiredMarkClass = tw("text-[oklch(0.55_0.19_25)] dark:text-[oklch(0.72_0.16_25)]");

export const errorClass = tw("text-sm text-[oklch(0.55_0.19_25)] dark:text-[oklch(0.72_0.16_25)]");

export const inputClass = tw(
  "h-11 w-full rounded-sm border bg-white px-3.5 text-sm text-[oklch(0.22_0.02_260)] outline-none placeholder:text-[oklch(0.5_0.02_260)] placeholder:opacity-100 focus-visible:border-[#0a60ff] focus-visible:ring-2 focus-visible:ring-[#0a60ff]/40 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[oklch(0.21_0.02_260)] dark:text-[oklch(0.96_0.01_80)] dark:placeholder:text-[oklch(0.72_0.02_260)] dark:focus-visible:border-[#3d7dff] dark:focus-visible:ring-[#3d7dff]/40",
);

export const inputOkClass = tw("border-[oklch(0.9_0.012_260)] dark:border-[oklch(0.32_0.02_260)]");

export const inputErrorClass = tw("border-[oklch(0.55_0.19_25)] dark:border-[oklch(0.72_0.16_25)]");

export const submitClass = tw(
  "inline-flex h-11 cursor-pointer items-center justify-center rounded-sm bg-[#0a60ff] px-5 text-sm font-medium text-white outline-none hover:bg-[#0052f1] focus-visible:ring-2 focus-visible:ring-[#0a60ff]/50 focus-visible:ring-offset-2 active:bg-[#014ad7] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#3d7dff] dark:hover:bg-[#2f6ef0] dark:focus-visible:ring-[#3d7dff]/50",
);
