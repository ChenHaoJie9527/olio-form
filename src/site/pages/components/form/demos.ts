import type { ComponentType } from "react";
import Basic from "./demos/basic";
import basicCode from "./demos/basic.tsx?raw";
import Layout from "./demos/layout";
import layoutCode from "./demos/layout.tsx?raw";
import type { MessageKey } from "@/site/i18n";

export type FormDemoId = "basic" | "layout";

export type FormDemo = {
  id: FormDemoId;
  titleKey: MessageKey;
  descriptionKey: MessageKey;
  Component: ComponentType;
  code: string;
};

export const formDemos: FormDemo[] = [
  {
    id: "basic",
    titleKey: "formDemoBasicTitle",
    descriptionKey: "formDemoBasicDescription",
    Component: Basic,
    code: basicCode,
  },
  {
    id: "layout",
    titleKey: "formDemoLayoutTitle",
    descriptionKey: "formDemoLayoutDescription",
    Component: Layout,
    code: layoutCode,
  },
];
