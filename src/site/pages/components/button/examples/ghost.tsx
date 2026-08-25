import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Loader, Plus as PlusIcon } from "lucide-react";

function Row({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>;
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="grid gap-3">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      {children}
    </div>
  );
}

export default function GhostExample() {
  return (
    <div className="grid gap-10">
      <section className="grid gap-6">
        <h3 className="text-lg font-semibold tracking-tight">Primary</h3>
        <Block title="Default">
          <Row>
            <Button appearance="ghost" variant="primary" size="lg">
              Large Button
            </Button>
            <Button appearance="ghost" variant="primary" size="md">
              Medium Button
            </Button>
            <Button appearance="ghost" variant="primary" size="sm">
              Small Button
            </Button>
          </Row>
          <Row>
            <Button appearance="ghost" variant="primary" size="lg" icon aria-label="Large Button">
              <PlusIcon className="size-5" />
            </Button>
            <Button appearance="ghost" variant="primary" size="md" icon aria-label="Medium Button">
              <PlusIcon className="size-4" />
            </Button>
            <Button appearance="ghost" variant="primary" size="sm" icon aria-label="Small Button">
              <PlusIcon className="size-3.5" />
            </Button>
          </Row>
        </Block>
        <Block title="Disabled">
          <Row>
            <Button appearance="ghost" variant="primary" size="lg" disabled>
              Large Button
            </Button>
            <Button appearance="ghost" variant="primary" size="md" disabled>
              Medium Button
            </Button>
            <Button appearance="ghost" variant="primary" size="sm" disabled>
              Small Button
            </Button>
          </Row>
          <Row>
            <Button
              appearance="ghost"
              variant="primary"
              size="lg"
              icon
              disabled
              aria-label="Large Button"
            >
              <PlusIcon className="size-5" />
            </Button>
            <Button
              appearance="ghost"
              variant="primary"
              size="md"
              icon
              disabled
              aria-label="Medium Button"
            >
              <PlusIcon className="size-4" />
            </Button>
            <Button
              appearance="ghost"
              variant="primary"
              size="sm"
              icon
              disabled
              aria-label="Small Button"
            >
              <PlusIcon className="size-3.5" />
            </Button>
          </Row>
        </Block>
      </section>

      <section className="grid gap-6">
        <h3 className="text-lg font-semibold tracking-tight">Secondary</h3>
        <Block title="Default">
          <Row>
            <Button appearance="ghost" variant="secondary" size="lg">
              Large Button
            </Button>
            <Button appearance="ghost" variant="secondary" size="md">
              Medium Button
            </Button>
            <Button appearance="ghost" variant="secondary" size="sm">
              Small Button
            </Button>
          </Row>
          <Row>
            <Button appearance="ghost" variant="secondary" size="lg" icon aria-label="Large Button">
              <PlusIcon className="size-5" />
            </Button>
            <Button
              appearance="ghost"
              variant="secondary"
              size="md"
              icon
              aria-label="Medium Button"
            >
              <PlusIcon className="size-4" />
            </Button>
            <Button appearance="ghost" variant="secondary" size="sm" icon aria-label="Small Button">
              <PlusIcon className="size-3.5" />
            </Button>
          </Row>
        </Block>
        <Block title="Disabled">
          <Row>
            <Button appearance="ghost" variant="secondary" size="lg" disabled>
              Large Button
            </Button>
            <Button appearance="ghost" variant="secondary" size="md" disabled>
              Medium Button
            </Button>
            <Button appearance="ghost" variant="secondary" size="sm" disabled>
              Small Button
            </Button>
          </Row>
          <Row>
            <Button
              appearance="ghost"
              variant="secondary"
              size="lg"
              icon
              disabled
              aria-label="Large Button"
            >
              <PlusIcon className="size-5" />
            </Button>
            <Button
              appearance="ghost"
              variant="secondary"
              size="md"
              icon
              disabled
              aria-label="Medium Button"
            >
              <PlusIcon className="size-4" />
            </Button>
            <Button
              appearance="ghost"
              variant="secondary"
              size="sm"
              icon
              disabled
              aria-label="Small Button"
            >
              <PlusIcon className="size-3.5" />
            </Button>
          </Row>
        </Block>
      </section>

      <section className="grid gap-6">
        <h3 className="text-lg font-semibold tracking-tight">Neutral</h3>
        <Block title="Default">
          <Row>
            <Button appearance="ghost" variant="neutral" size="lg">
              Large Button
            </Button>
            <Button appearance="ghost" variant="neutral" size="md">
              Medium Button
            </Button>
            <Button appearance="ghost" variant="neutral" size="sm">
              Small Button
            </Button>
          </Row>
          <Row>
            <Button appearance="ghost" variant="neutral" size="lg" icon aria-label="Large Button">
              <PlusIcon className="size-5" />
            </Button>
            <Button appearance="ghost" variant="neutral" size="md" icon aria-label="Medium Button">
              <PlusIcon className="size-4" />
            </Button>
            <Button appearance="ghost" variant="neutral" size="sm" icon aria-label="Small Button">
              <PlusIcon className="size-3.5" />
            </Button>
          </Row>
        </Block>
        <Block title="Disabled">
          <Row>
            <Button appearance="ghost" variant="neutral" size="lg" disabled>
              Large Button
            </Button>
            <Button appearance="ghost" variant="neutral" size="md" disabled>
              Medium Button
            </Button>
            <Button appearance="ghost" variant="neutral" size="sm" disabled>
              Small Button
            </Button>
          </Row>
          <Row>
            <Button
              appearance="ghost"
              variant="neutral"
              size="lg"
              icon
              disabled
              aria-label="Large Button"
            >
              <PlusIcon className="size-5" />
            </Button>
            <Button
              appearance="ghost"
              variant="neutral"
              size="md"
              icon
              disabled
              aria-label="Medium Button"
            >
              <PlusIcon className="size-4" />
            </Button>
            <Button
              appearance="ghost"
              variant="neutral"
              size="sm"
              icon
              disabled
              aria-label="Small Button"
            >
              <PlusIcon className="size-3.5" />
            </Button>
          </Row>
        </Block>
      </section>
      <section className="grid gap-6">
        <h3 className="text-lg font-semibold tracking-tight">Loading</h3>
        <Block title="Loading">
          <Row>
            <Button appearance="ghost" size="sm" loading aria-label="Small Button" />
            <Button
              appearance="ghost"
              loading
              aria-label="Small Button"
              size="sm"
              loadingIcon={<Loader className="size-4 animate-spin" />}
            />
          </Row>
        </Block>
      </section>
    </div>
  );
}
