import { Button } from "@/components/ui/button";

export default function OutlineExample() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <p className="text-sm font-medium text-muted-foreground">Default</p>
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
      </div>
      <div className="grid gap-3">
        <p className="text-sm font-medium text-muted-foreground">Disabled</p>
        <div className="flex flex-wrap items-center gap-2">
          <Button appearance="outline" variant="primary" disabled>
            Primary
          </Button>
          <Button appearance="outline" variant="secondary" disabled>
            Secondary
          </Button>
          <Button appearance="outline" variant="neutral" disabled>
            Neutral
          </Button>
        </div>
      </div>
      <div className="grid gap-3">
        <p className="text-sm font-medium text-muted-foreground">Loading</p>
        <div className="flex flex-wrap items-center gap-2">
          <Button appearance="outline" variant="primary" loading>
            Primary
          </Button>
          <Button appearance="outline" variant="secondary" loading>
            Secondary
          </Button>
          <Button appearance="outline" variant="neutral" loading>
            Neutral
          </Button>
        </div>
      </div>
    </div>
  );
}
