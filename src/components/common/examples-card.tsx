import { useId, useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";

type ExampleCardProps = {
  title: string;
  preview: ReactNode;
  code: string;
};

export function ExampleCard({ title, preview, code }: ExampleCardProps) {
  const codeId = useId();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex min-h-48 items-center justify-center p-8">{preview}</div>
      <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-2.5">
        <p className="truncate text-sm text-muted-foreground">{title}</p>
        <div className="flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            onClick={() => void copy()}
            className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-md px-2 py-1 text-sm text-muted-foreground hover:text-foreground"
            aria-expanded={open}
            aria-controls={codeId}
          >
            View code
          </button>
        </div>
      </div>
      <div id={codeId} hidden={!open}>
        <pre className="overflow-auto border-t border-border bg-muted/40 p-4 text-xs leading-6 text-foreground">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
