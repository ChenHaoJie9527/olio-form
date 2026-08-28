import { Drawer } from "@base-ui/react/drawer";

interface ExamplesDrawerProps {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  children?: React.ReactNode;
  trigger: React.ReactElement;
}

export function ExamplesDrawer({ title, description, children, trigger }: ExamplesDrawerProps) {
  return (
    <Drawer.Root swipeDirection="right">
      <Drawer.Trigger render={trigger} />
      <Drawer.Portal>
        <Drawer.Viewport className="[--viewport-padding:0px] supports-[-webkit-touch-callout:none]:[--viewport-padding:0.625rem] fixed inset-0 flex items-stretch justify-end p-(--viewport-padding)">
          <Drawer.Popup className="[--bleed:3rem] supports-[-webkit-touch-callout:none]:[--bleed:0px] h-full w-2xl max-w-[calc(100vw-3rem+3rem)] border-l border-border bg-background text-foreground outline-none shadow-[0.25rem_0.25rem_0] shadow-black/12 overflow-y-auto overscroll-contain touch-auto [transform:translateX(var(--drawer-swipe-movement-x))] transition-transform duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:select-none data-ending-style:[transform:translateX(calc(100%-var(--bleed)+var(--viewport-padding)+2px))] data-starting-style:[transform:translateX(calc(100%-var(--bleed)+var(--viewport-padding)+2px))] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:mr-0 supports-[-webkit-touch-callout:none]:w-[20rem] supports-[-webkit-touch-callout:none]:max-w-[calc(100vw-3rem)] supports-[-webkit-touch-callout:none]:border supports-[-webkit-touch-callout:none]:border-border supports-[-webkit-touch-callout:none]:pr-6 dark:shadow-none">
            <Drawer.Content className=" w-full">
              <div className="space-y-1 border-b border-border py-2">
                <Drawer.Title className="text-base font-bold px-4">{title}</Drawer.Title>
                <Drawer.Description className="px-4 text-sm text-neutral-600 dark:text-neutral-400">
                  {description}
                </Drawer.Description>
              </div>
              {children}
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
