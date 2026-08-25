import type { ReactNode } from "react";
import { ExampleCard } from "@/components/common";
import { Button, type ButtonAppearance, type ButtonVariant } from "@/components/ui/button";
import filledSource from "./examples/filled.tsx?raw";
import ghostSource from "./examples/ghost.tsx?raw";
import outlineSource from "./examples/outline.tsx?raw";
import roundSource from "./examples/round.tsx?raw";
import sizeSource from "./examples/size.tsx?raw";
import FilledExample from "./examples/filled";
import SizeExample from "./examples/size";

const variants = ["primary", "secondary", "neutral"] as const satisfies ButtonVariant[];
const states = ["default", "disabled", "loading"] as const;

type ButtonState = (typeof states)[number];

const appearanceExamples = [
  { appearance: "filled", title: "Filled", code: filledSource },
  { appearance: "ghost", title: "Ghost", code: ghostSource },
  { appearance: "outline", title: "Outline", code: outlineSource },
  { appearance: "round", title: "Round", code: roundSource },
] as const satisfies {
  appearance: ButtonAppearance;
  title: string;
  code: string;
}[];

function label(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function PreviewRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center justify-center gap-2">{children}</div>;
}

function StateButton({
  appearance,
  variant,
  state,
}: {
  appearance: ButtonAppearance;
  variant: ButtonVariant;
  state: ButtonState;
}) {
  return (
    <Button
      appearance={appearance}
      variant={variant}
      disabled={state === "disabled"}
      loading={state === "loading"}
      tabIndex={state === "default" ? undefined : -1}
    >
      {label(variant)}
    </Button>
  );
}

function ButtonMatrix({ appearance }: { appearance: ButtonAppearance }) {
  return (
    <table className="w-full min-w-3xl border-collapse">
      <caption className="sr-only">
        {label(appearance)} button states across primary, secondary, and neutral
      </caption>
      <thead>
        <tr>
          <th className="w-24 px-2 py-2 text-left text-xs font-medium text-muted-foreground" />
          {states.map((state) => (
            <th
              key={state}
              scope="col"
              className="px-2 py-2 text-center text-xs font-medium text-muted-foreground"
            >
              {label(state)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {variants.map((variant) => (
          <tr key={variant}>
            <th
              scope="row"
              className="px-2 py-3 text-left text-sm font-medium text-muted-foreground"
            >
              {label(variant)}
            </th>
            {states.map((state) => (
              <td key={state} className="px-2 py-3 text-center">
                <StateButton appearance={appearance} variant={variant} state={state} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ButtonDemo() {
  return (
    <div className="grid gap-4">
      {appearanceExamples.map((example) => (
        <ExampleCard
          key={example.appearance}
          title={example.title}
          preview={
            example.appearance === "filled" ? (
              <FilledExample />
            ) : (
              <ButtonMatrix appearance={example.appearance} />
            )
          }
          code={example.code}
          layout="flush"
        />
      ))}
      <ExampleCard
        title="Size"
        preview={
          <PreviewRow>
            <SizeExample />
          </PreviewRow>
        }
        code={sizeSource}
      />
    </div>
  );
}
