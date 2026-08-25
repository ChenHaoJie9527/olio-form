import { type ReactNode } from "react";
import { Tabs } from "@base-ui/react/tabs";
import { ExamplesDrawer } from "./examples-drawer";
import { CodeBlock } from "./code-block";
import { cn, tw } from "@/lib/utils";

type ExampleCardProps = {
  title: string;
  preview: ReactNode;
  code: string;
  source?: string;
  layout?: "center" | "flush";
  utils?: string;
};

const tabClasses = tw(
  "relative h-9 text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:text-foreground aria-selected:text-foreground",
);

function ExampleCodeTabs({
  code,
  source,
  utils,
}: {
  code: string;
  source: string;
  utils?: string;
}) {
  return (
    <Tabs.Root defaultValue="usage">
      <Tabs.List className="relative flex gap-5 border-b border-border px-4">
        <Tabs.Tab value="usage" className={tabClasses}>
          Usage
        </Tabs.Tab>
        <Tabs.Tab value="source" className={tabClasses}>
          Source
        </Tabs.Tab>
        <Tabs.Tab value="utils" className={tabClasses}>
          lib/utils.ts
        </Tabs.Tab>
        <Tabs.Indicator className="absolute bottom-0 left-(--active-tab-left) z-1 h-0.5 w-(--active-tab-width) bg-foreground transition-[left,width] duration-200" />
      </Tabs.List>
      <Tabs.Panel value="usage" className="pb-4" keepMounted>
        <CodeBlock code={code} />
      </Tabs.Panel>
      <Tabs.Panel value="source" className="pb-4" keepMounted>
        <CodeBlock code={source} />
      </Tabs.Panel>
      <Tabs.Panel value="utils" className="pb-4" keepMounted>
        <CodeBlock code={utils ?? ""} />
      </Tabs.Panel>
    </Tabs.Root>
  );
}

export function ExampleCard({
  title,
  preview,
  code,
  source,
  layout = "center",
  utils,
}: ExampleCardProps) {
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
            description={
              source ? "Usage example and component source" : "View the code for this example"
            }
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
            {source ? (
              <ExampleCodeTabs code={code} source={source} utils={utils} />
            ) : (
              <CodeBlock code={code} />
            )}
          </ExamplesDrawer>
        </div>
      </div>
    </div>
  );
}
