import type { ComponentType } from "react";
import Basic from "./demos/basic";
import basicCode from "./demos/basic.tsx?raw";
import Layout from "./demos/layout";
import layoutCode from "./demos/layout.tsx?raw";

export type FormDemo = {
  id: string;
  title: string;
  description: string;
  Component: ComponentType;
  code: string;
};

export const formDemos: FormDemo[] = [
  {
    id: "basic",
    title: "Basic usage",
    description: "Schema, useForm, and submit.",
    Component: Basic,
    code: basicCode,
  },
  {
    id: "layout",
    title: "Form layout",
    description: "Vertical, horizontal, and inline.",
    Component: Layout,
    code: layoutCode,
  },
];
