import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

type DocPageProps = {
  title: string;
  description: string;
  preview: ReactNode;
  children?: ReactNode;
  className?: string;
  framed?: boolean;
};

function Preview({ children }: { children: ReactNode }) {
  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    const anchor = (event.target as HTMLElement).closest("a");
    const href = anchor?.getAttribute("href");
    if (href?.startsWith("/")) {
      event.preventDefault();
    }
  };

  return (
    <div
      onClick={onClick}
      className="flex min-h-80 items-center justify-center rounded-xl border border-border bg-muted/40 p-6"
    >
      {children}
    </div>
  );
}

export function DocPage({
  title,
  description,
  preview,
  children,
  className,
  framed = true,
}: DocPageProps) {
  return (
    <article className={cn("mx-auto max-w-3xl px-4 py-12 md:px-6", className)}>
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-muted-foreground">{description}</p>
      <div className="mt-8">{framed ? <Preview>{preview}</Preview> : preview}</div>
      {children ? <div className="mt-8 grid gap-4 text-sm leading-6">{children}</div> : null}
    </article>
  );
}
