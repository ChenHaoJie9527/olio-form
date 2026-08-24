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

const buttonExamples = [
  {
    title: "Default button",
    preview: <DefaultButton>Default</DefaultButton>,
    code: defaultSource,
  },
  {
    title: "Secondary button",
    preview: <SecondaryButton>Secondary</SecondaryButton>,
    code: secondarySource,
  },
  {
    title: "Ghost button",
    preview: <GhostButton>Ghost</GhostButton>,
    code: ghostSource,
  },
  {
    title: "Destructive button",
    preview: <DestructiveButton>Destructive</DestructiveButton>,
    code: destructiveSource,
  },
  {
    title: "Text button",
    preview: <TextButton>Text</TextButton>,
    code: textSource,
  },
  {
    title: "Link button",
    preview: <LinkButton>Link</LinkButton>,
    code: linkSource,
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
