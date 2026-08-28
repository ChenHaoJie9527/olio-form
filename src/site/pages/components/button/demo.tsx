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
import { useLocale, type MessageKey } from "@/site/i18n";

const buttonExamples = [
  {
    titleKey: "buttonFilled" satisfies MessageKey,
    preview: <FilledExample />,
    code: filledSource,
    source: buttonSource,
    utils: buttonUtils,
  },
  {
    titleKey: "buttonGhost" satisfies MessageKey,
    preview: <GhostExample />,
    code: ghostSource,
    source: buttonSource,
    utils: buttonUtils,
  },
  {
    titleKey: "buttonOutline" satisfies MessageKey,
    preview: <OutlineExample />,
    code: outlineSource,
    source: buttonSource,
    utils: buttonUtils,
  },
  {
    titleKey: "buttonRound" satisfies MessageKey,
    preview: <RoundExample />,
    code: roundSource,
    source: buttonSource,
    utils: buttonUtils,
  },
] as const;

export function ButtonDemo() {
  const { t } = useLocale();

  return (
    <div className="grid gap-4">
      {buttonExamples.map((example) => (
        <ExampleCard
          key={example.titleKey}
          title={t(example.titleKey)}
          preview={example.preview}
          code={example.code}
          source={example.source}
          layout="flush"
          utils={buttonUtils}
        />
      ))}
    </div>
  );
}
