import { Button } from "@/components/ui/button";

export default function OutlineExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button appearance="outline" variant="primary">
        Primary
      </Button>
      <Button appearance="outline" variant="secondary">
        Secondary
      </Button>
      <Button appearance="outline" variant="neutral">
        Neutral
      </Button>
    </div>
  );
}
