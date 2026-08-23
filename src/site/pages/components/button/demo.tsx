import { Button } from "@/components/ui/button";
import { ExampleCard } from "@/components/common";

const buttonExamples = [
  {
    title: "Default button",
    preview: <Button>Default</Button>,
    code: `<Button>Default</Button>`,
  },
  {
    title: "Secondary button",
    preview: <Button variant="secondary">Secondary</Button>,
    code: `<Button variant="secondary">Secondary</Button>`,
  },
  {
    title: "Ghost button",
    preview: <Button variant="ghost">Ghost</Button>,
    code: `<Button variant="ghost">Ghost</Button>`,
  },
  {
    title: "Destructive button",
    preview: <Button variant="destructive">Destructive</Button>,
    code: `<Button variant="destructive">Destructive</Button>`,
  },
  {
    title: "Text button",
    preview: <Button variant="text">Text</Button>,
    code: `<Button variant="text">Text</Button>`,
  },
  {
    title: "Link button",
    preview: <Button variant="link">Link</Button>,
    code: `<Button variant="link">Link</Button>`,
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
