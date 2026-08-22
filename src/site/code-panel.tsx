import { useState, type MouseEvent, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export type SourceFile = {
  path: string;
  code: string;
};

export function Preview({ children }: { children: ReactNode }) {
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

export function CodePanel({ files }: { files: SourceFile[] }) {
  const [active, setActive] = useState(files[0]?.path ?? "");
  const [copied, setCopied] = useState(false);
  const current = files.find((file) => file.path === active) ?? files[0];

  if (!current) return null;

  const copy = async () => {
    await navigator.clipboard.writeText(current.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="flex items-center gap-1 overflow-x-auto border-b border-border bg-muted/50 p-1">
        {files.map((file) => (
          <button
            key={file.path}
            type="button"
            onClick={() => setActive(file.path)}
            className={cn(
              "shrink-0 rounded-md px-2.5 py-1.5 font-mono text-xs",
              file.path === current.path
                ? "bg-card text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {file.path}
          </button>
        ))}
        <button
          type="button"
          onClick={() => void copy()}
          className="ml-auto inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
          aria-label="Copy file"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </button>
      </div>
      <pre className="max-h-128 overflow-auto bg-card p-4 text-xs leading-6 text-foreground">
        <code>{current.code}</code>
      </pre>
    </div>
  );
}
