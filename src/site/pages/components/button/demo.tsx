import type { ReactNode } from "react";
import { ExampleCard } from "@/components/common";
import FilledButton from "./examples/filled";
import filledSource from "./examples/filled.tsx?raw";

function PreviewRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center justify-center gap-2">{children}</div>;
}

const buttonExamples = [
  {
    title: "Filled button",
    preview: (
      <PreviewRow>
        <FilledButton variant="success" size="sm">
          Success
        </FilledButton>
        <FilledButton variant="primary" size="md">
          Primary
        </FilledButton>
        <FilledButton variant="primary" size="lg">
          Primary
        </FilledButton>
      </PreviewRow>
    ),
    code: filledSource,
  },
] as const;

export function ButtonDemo() {
  return (
    <div className="">
      {buttonExamples.map((example) => (
        <ExampleCard key={example.title} {...example} />
      ))}
    </div>
  );
}
