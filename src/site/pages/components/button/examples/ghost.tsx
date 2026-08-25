import { Button } from "@/components/ui/button";

export default function GhostExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button appearance="ghost" variant="primary">
        Primary
      </Button>
      <Button appearance="ghost" variant="secondary">
        Secondary
      </Button>
      <Button appearance="ghost" variant="neutral">
        Neutral
      </Button>
    </div>
  );
}
