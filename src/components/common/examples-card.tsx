import { type ReactNode } from "react";
import { ExamplesDrawer } from "./examples-drawer";
import { CodeBlock } from "./code-block";
import { cn } from "@/lib/utils";

type ExampleCardProps = {
  title: string;
  preview: ReactNode;
  code: string;
  layout?: "center" | "flush";
};

export function ExampleCard({ title, preview, code, layout = "center" }: ExampleCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div
        className={cn(
          layout === "center"
            ? "flex min-h-48 items-center justify-center p-8"
            : "overflow-x-auto p-5",
        )}
      >
        {preview}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-2.5">
        <p className="truncate text-sm text-muted-foreground">{title}</p>
        <div className="flex shrink-0 items-center">
          <ExamplesDrawer
            title={title}
            description="View the code for this example"
            trigger={
              <button
                type="button"
                className="inline-flex h-8 items-center rounded-md px-2 text-sm text-muted-foreground hover:text-foreground"
                aria-label="View code"
              >
                View code
              </button>
            }
          >
            <CodeBlock code={code} />
          </ExamplesDrawer>
        </div>
      </div>
    </div>
  );
}
