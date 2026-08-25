import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/button";
import { PlusIcon } from "@/components/ui/icons";

const variants = ["primary", "secondary", "neutral"] as const satisfies ButtonVariant[];
const states = ["default", "disabled"] as const;
const sizes = ["lg", "md", "sm"] as const satisfies ButtonSize[];

const sizeLabel = {
  lg: "Large Button",
  md: "Medium Button",
  sm: "Small Button",
} as const;

const iconSizeClass = {
  lg: "size-5",
  md: "size-4",
  sm: "size-3.5",
} as const;

function label(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function FilledExample() {
  return (
    <div className="grid gap-10">
      {variants.map((variant) => (
        <section key={variant} className="grid gap-6">
          <h3 className="text-lg font-semibold tracking-tight">{label(variant)}</h3>
          {states.map((state) => {
            const disabled = state === "disabled";

            return (
              <div key={state} className="grid gap-3">
                <p className="text-sm font-medium text-muted-foreground">{label(state)}</p>
                <div className="flex flex-wrap items-center gap-3">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      appearance="filled"
                      variant={variant}
                      size={size}
                      disabled={disabled}
                    >
                      {sizeLabel[size]}
                    </Button>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      appearance="filled"
                      variant={variant}
                      size={size}
                      icon
                      disabled={disabled}
                      aria-label={sizeLabel[size]}
                    >
                      <PlusIcon className={iconSizeClass[size]} />
                    </Button>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      ))}
    </div>
  );
}
