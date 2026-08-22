import type { ReactNode } from "react";
import { CodePanel, Preview, type SourceFile } from "@/site/code-panel";

type DocPageProps = {
  title: string;
  description: string;
  preview: ReactNode;
  files: SourceFile[];
  children?: ReactNode;
};

export function DocPage({ title, description, preview, files, children }: DocPageProps) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-muted-foreground">{description}</p>
      <div className="mt-8">
        <Preview>{preview}</Preview>
      </div>
      <div className="mt-6">
        <CodePanel files={files} />
      </div>
      {children ? <div className="mt-8 grid gap-4 text-sm leading-6">{children}</div> : null}
    </article>
  );
}
