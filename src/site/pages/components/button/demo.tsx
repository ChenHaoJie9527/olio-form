import { ExampleCard } from "@/components/common";
import filledSource from "./examples/filled.tsx?raw";
import ghostSource from "./examples/ghost.tsx?raw";
import outlineSource from "./examples/outline.tsx?raw";
import roundSource from "./examples/round.tsx?raw";
import buttonSource from "@/components/ui/button.tsx?raw";
import FilledExample from "./examples/filled";
import GhostExample from "./examples/ghost";
import OutlineExample from "./examples/outline";
import RoundExample from "./examples/round";
import buttonUtils from "@/lib/utils.ts?raw";

const buttonExamples = [
  {
    title: "Filled",
    preview: <FilledExample />,
    code: filledSource,
    source: buttonSource,
    utils: buttonUtils,
  },
  {
    title: "Ghost",
    preview: <GhostExample />,
    code: ghostSource,
    source: buttonSource,
    utils: buttonUtils,
  },
  {
    title: "Outline",
    preview: <OutlineExample />,
    code: outlineSource,
    source: buttonSource,
    utils: buttonUtils,
  },
  {
    title: "Round",
    preview: <RoundExample />,
    code: roundSource,
    source: buttonSource,
    utils: buttonUtils,
  },
] as const;

export function ButtonDemo() {
  return (
    <div className="grid gap-4">
      {buttonExamples.map((example) => (
        <ExampleCard key={example.title} {...example} layout="flush" utils={buttonUtils} />
      ))}
    </div>
  );
}
