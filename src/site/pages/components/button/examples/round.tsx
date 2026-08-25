import { Button } from "@/components/ui/button";

export default function RoundExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button appearance="round" variant="primary">
        Primary
      </Button>
      <Button appearance="round" variant="secondary">
        Secondary
      </Button>
      <Button appearance="round" variant="neutral">
        Neutral
      </Button>
    </div>
  );
}
