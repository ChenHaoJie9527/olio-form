import { use, useState, Suspense } from "react";
import { Check, Copy } from "lucide-react";
import { createHighlighter } from "shiki";

const highlighterPromise = createHighlighter({
  langs: ["tsx"],
  themes: ["min-light", "min-dark"],
});

type CodeBlockProps = {
  code: string;
  lang?: string;
};

export function HighlightedCode({ code, lang = "tsx" }: CodeBlockProps) {
  const highlighter = use(highlighterPromise);

  const html = highlighter.codeToHtml(code, {
    lang,
    themes: {
      light: "min-light",
      dark: "min-dark",
    },
    defaultColor: "light-dark()",
  });
  return (
    <div
      className="code-block max-w-full min-w-0 overflow-x-auto p-4 pt-12 text-xs leading-6"
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
}

export function CodeBlock({ code, lang = "tsx" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="relative mx-4 mt-2 max-w-full min-w-0 overflow-hidden rounded-xl border border-border bg-muted/40">
      <button
        type="button"
        onClick={onCopy}
        className="absolute top-3 right-3 z-10 inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
        aria-label={copied ? "Copied" : "Copy code"}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </button>
      <Suspense
        fallback={
          <pre className="overflow-auto p-4 pt-12 text-xs leading-6 text-foreground">
            <code>{code}</code>
          </pre>
        }
      >
        <HighlightedCode code={code} lang={lang} />
      </Suspense>
    </div>
  );
}
