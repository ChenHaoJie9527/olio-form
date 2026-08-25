import type { ReactNode } from "react";
import { ExampleCard } from "@/components/common";
import DefaultButton from "./examples/default";
import defaultSource from "./examples/default.tsx?raw";
import SecondaryButton from "./examples/secondary";
import secondarySource from "./examples/secondary.tsx?raw";
import GhostButton from "./examples/ghost";
import ghostSource from "./examples/ghost.tsx?raw";
import DestructiveButton from "./examples/destructive";
import destructiveSource from "./examples/destructive.tsx?raw";
import TextButton from "./examples/text";
import textSource from "./examples/text.tsx?raw";
import LinkButton from "./examples/link";
import linkSource from "./examples/link.tsx?raw";
import FilledButton from "./examples/filled";
import filledSource from "./examples/filled.tsx?raw";

function PreviewRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center justify-center gap-2">{children}</div>;
}

const buttonExamples = [
  {
    title: "Default button",
    preview: (
      <div className="grid gap-3">
        <PreviewRow>
          <DefaultButton variant="solid">Solid</DefaultButton>
          <DefaultButton variant="outline">Outline</DefaultButton>
          <DefaultButton variant="soft">Soft</DefaultButton>
        </PreviewRow>
        <PreviewRow>
          <DefaultButton size="sm">Small</DefaultButton>
          <DefaultButton size="md">Medium</DefaultButton>
          <DefaultButton size="lg">Large</DefaultButton>
        </PreviewRow>
      </div>
    ),
    code: defaultSource,
  },
  {
    title: "Secondary button",
    preview: (
      <PreviewRow>
        <SecondaryButton variant="default">Default</SecondaryButton>
        <SecondaryButton variant="destructive">Destructive</SecondaryButton>
      </PreviewRow>
    ),
    code: secondarySource,
  },
  {
    title: "Ghost button",
    preview: (
      <PreviewRow>
        <GhostButton variant="default">Default</GhostButton>
        <GhostButton variant="destructive">Destructive</GhostButton>
      </PreviewRow>
    ),
    code: ghostSource,
  },
  {
    title: "Destructive button",
    preview: (
      <PreviewRow>
        <DestructiveButton variant="solid">Solid</DestructiveButton>
        <DestructiveButton variant="outline">Outline</DestructiveButton>
        <DestructiveButton variant="soft">Soft</DestructiveButton>
      </PreviewRow>
    ),
    code: destructiveSource,
  },
  {
    title: "Text button",
    preview: (
      <PreviewRow>
        <TextButton variant="default">Default</TextButton>
        <TextButton variant="destructive">Destructive</TextButton>
      </PreviewRow>
    ),
    code: textSource,
  },
  {
    title: "Link button",
    preview: (
      <PreviewRow>
        <LinkButton variant="default">Default</LinkButton>
        <LinkButton variant="destructive">Destructive</LinkButton>
      </PreviewRow>
    ),
    code: linkSource,
  },
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
    <div className="grid gap-4 sm:grid-cols-2">
      {buttonExamples.map((example) => (
        <ExampleCard key={example.title} {...example} />
      ))}
    </div>
  );
}
