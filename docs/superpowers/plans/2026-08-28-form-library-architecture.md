# Form library architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Form-as-catalog (Login/Register routes) with a copy-paste Formisch kit (`Form` + bound `TextField`/`Checkbox`) and an Ant-style Form doc page that hosts two isolated, copyable demos.

**Architecture:** Kit files stay at `src/components/ui` so demo source imports `@/components/ui/...` — the same path users paste. `Form` wraps Formisch `<Form>` and provides internal layout/disabled/required-mark context. Bound fields wrap Formisch `<Field>` and do not take `errors`/`input`/`field.props`. Demos live next to the Form doc page, one file each, registered only in `demos.ts`.

**Tech Stack:** React 19, Vite 8, `@formisch/react` 1.x, Valibot 1.x, React Router 8, Tailwind 4. No new test framework, no npm UI package, no Turborepo.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-08-28-form-library-architecture-design.md`.
- Do not wrap Formisch `useForm`, `setErrors`, `insert`, `reset`, or other methods.
- Do not add a test framework. Verify with `pnpm exec tsc -b --pretty false`, `pnpm lint`, and a browser pass.
- Do not add `@olio/form`, a CLI, Turborepo, or `apps/docs`.
- Demo files import only `react`, `@formisch/react`, `valibot`, and `@/components/ui/...`.
- Do not export `FormUiProvider`. `useFormUi` may be exported from `form.tsx` solely for sibling kit files (`text-field.tsx`, `checkbox.tsx`). Demos must not import it.
- `path` stays a Formisch path tuple (`["email"]`). Do not add `name` as a data address.
- Site copy stays English. First-version demos are exactly `basic` and `layout`. No empty demo slots.
- This repo only commits when the human explicitly asks. Skip every Commit step unless they have asked in this conversation.

## File map

- Create: `src/components/ui/form.tsx` — Formisch `<Form>` + internal UI context.
- Modify: `src/components/ui/field-layout.tsx` — `layout` + `requiredMark`.
- Modify: `src/components/ui/text-field.tsx` — bound `of` + `path` + `label`.
- Modify: `src/components/ui/checkbox.tsx` — one bound public `Checkbox`.
- Create: `src/site/pages/components/form/demos.ts` — ordered catalog.
- Create: `src/site/pages/components/form/demos/basic.tsx`
- Create: `src/site/pages/components/form/demos/layout.tsx`
- Modify: `src/site/pages/components/form/page.tsx` — long doc page.
- Modify: `src/site/pages/components/routes.ts` — Form is a single route.
- Modify: `src/site/nav.ts` — drop `formCatalog`; update Form catalog blurb.
- Modify: `src/site/pages/home.tsx`, `README.md` — copy-paste kit, not Login/Register templates.
- Delete: `src/components/examples/login/**`, `src/components/examples/register/**`, `src/site/pages/components/form/login/**`, `src/site/pages/components/form/register/**`.

---

### Task 1: Form shell

**Files:**

- Create: `src/components/ui/form.tsx`

**Interfaces:**

- Consumes: `Form` / `FormProps` / `FormSchema` from `@formisch/react`
- Produces:
  - `export type FormLayout = "vertical" | "horizontal" | "inline"`
  - `export type RequiredMark = "before" | "after" | false`
  - `export type FormUiValue = { layout: FormLayout; disabled: boolean; requiredMark: RequiredMark }`
  - `export function useFormUi(): FormUiValue`
  - `export function Form<TSchema extends FormSchema>(props: OlioFormProps<TSchema>): ReactElement`
  - `OlioFormProps<TSchema> = Formisch FormProps<TSchema> & { layout?: FormLayout; disabled?: boolean; requiredMark?: RequiredMark }`
  - Defaults: `layout="vertical"`, `disabled=false`, `requiredMark="after"`

- [ ] **Step 1: Add `src/components/ui/form.tsx`**

```tsx
import { useMemo, type ReactNode } from "react";
import { createContext, useContext } from "react";
import { Form as FormischForm, type FormProps, type FormSchema } from "@formisch/react";

export type FormLayout = "vertical" | "horizontal" | "inline";
export type RequiredMark = "before" | "after" | false;

export type FormUiValue = {
  layout: FormLayout;
  disabled: boolean;
  requiredMark: RequiredMark;
};

const FormUiContext = createContext<FormUiValue>({
  layout: "vertical",
  disabled: false,
  requiredMark: "after",
});

export function useFormUi() {
  return useContext(FormUiContext);
}

export type OlioFormProps<TSchema extends FormSchema = FormSchema> = FormProps<TSchema> & {
  layout?: FormLayout;
  disabled?: boolean;
  requiredMark?: RequiredMark;
  children?: ReactNode;
};

export function Form<TSchema extends FormSchema>({
  of,
  onSubmit,
  layout = "vertical",
  disabled = false,
  requiredMark = "after",
  className,
  children,
  ...props
}: OlioFormProps<TSchema>) {
  const value = useMemo(
    () => ({ layout, disabled, requiredMark }),
    [layout, disabled, requiredMark],
  );

  return (
    <FormUiContext value={value}>
      <FormischForm of={of} onSubmit={onSubmit} className={className} {...props}>
        <fieldset disabled={disabled} className="m-0 min-w-0 border-0 p-0">
          {children}
        </fieldset>
      </FormischForm>
    </FormUiContext>
  );
}
```

Do not export a `FormUiProvider` component.

- [ ] **Step 2: Typecheck**

```bash
pnpm exec tsc -b --pretty false
```

Expected: exit 0.

- [ ] **Step 3: Commit**

Skip unless the user asked to commit.

---

### Task 2: Cut over bound fields and remove scene routes

Old `TextField`/`Checkbox` take `errors` + `input`/`checked` + `FieldElementProps`. Register and login examples depend on that. Change the kit and delete those consumers in this task so `tsc` stays green.

**Files:**

- Modify: `src/components/ui/field-layout.tsx`
- Modify: `src/components/ui/text-field.tsx` (replace entire file)
- Modify: `src/components/ui/checkbox.tsx` (replace entire file)
- Modify: `src/site/pages/components/form/page.tsx` (temporary heading page; Task 4 replaces it)
- Modify: `src/site/pages/components/routes.ts`
- Modify: `src/site/nav.ts`
- Delete:
  - `src/components/examples/login/checkbox.tsx`
  - `src/components/examples/login/field-frame.tsx`
  - `src/components/examples/login/form-context.ts`
  - `src/components/examples/login/form-provider.tsx`
  - `src/components/examples/login/login-form.tsx`
  - `src/components/examples/login/schema.ts`
  - `src/components/examples/login/styles.ts`
  - `src/components/examples/login/text-field-label.tsx`
  - `src/components/examples/login/text-field.tsx`
  - `src/components/examples/register/register-form.tsx`
  - `src/components/examples/register/schema.ts`
  - `src/site/pages/components/form/login/page.tsx`
  - `src/site/pages/components/form/register/page.tsx`

**Interfaces:**

- Consumes: `FormLayout`, `RequiredMark`, `useFormUi` from `@/components/ui/form`; `Field`, `FormSchema`, `FormStore`, `RequiredPath`, `ValidPath` from `@formisch/react`
- Produces:
  - `FieldLayout` props: existing plus `layout?: FormLayout` (default `"vertical"`) and `requiredMark?: RequiredMark` (default `"after"`)
  - `TextField<TSchema, TFieldPath>({ of, path, label, ... })` — `of: FormStore<TSchema>`, `path: ValidPath<v.InferInput<TSchema>, TFieldPath>`, `label: string` required. No public `errors` / `input` / `field.props`
  - `Checkbox<TSchema, TFieldPath>({ of, path, label, ... })` — same `of`/`path`; `label: ReactNode` required. One public export only

- [ ] **Step 1: Replace `src/components/ui/field-layout.tsx`**

```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { FormLayout, RequiredMark } from "@/components/ui/form";

export type FieldSize = "sm" | "md";

type FieldLayoutProps = {
  name: string;
  label?: ReactNode;
  description?: ReactNode;
  required?: boolean;
  requiredMark?: RequiredMark;
  layout?: FormLayout;
  errors: [string, ...string[]] | null;
  children: ReactNode;
  className?: string;
};

export function FieldLayout({
  name,
  label,
  description,
  required,
  requiredMark = "after",
  layout = "vertical",
  errors,
  children,
  className,
}: FieldLayoutProps) {
  const mark =
    required && requiredMark !== false ? (
      <span className="text-danger" aria-hidden="true">
        *
      </span>
    ) : null;

  const labelNode = label ? (
    <label htmlFor={name} className="text-sm font-medium text-foreground">
      {requiredMark === "before" ? (
        <>
          {mark}
          {mark ? " " : null}
          {label}
        </>
      ) : (
        <>
          {label}
          {mark ? " " : null}
          {mark}
        </>
      )}
    </label>
  ) : null;

  const descriptionNode = description ? (
    <p id={`${name}-description`} className="text-sm text-muted-foreground">
      {description}
    </p>
  ) : null;

  const errorNode = errors ? (
    <p id={`${name}-error`} role="alert" className="text-sm text-danger">
      {errors[0]}
    </p>
  ) : null;

  if (layout === "horizontal") {
    return (
      <div
        className={cn(
          "grid grid-cols-[max-content_minmax(0,1fr)] items-start gap-x-3 gap-y-1",
          className,
        )}
      >
        {labelNode}
        <div className="grid min-w-0 gap-1.5">
          {descriptionNode}
          {children}
          {errorNode}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-1.5",
        layout === "inline" ? "inline-grid align-top" : null,
        className,
      )}
    >
      {labelNode}
      {descriptionNode}
      {children}
      {errorNode}
    </div>
  );
}
```

- [ ] **Step 2: Replace `src/components/ui/text-field.tsx`**

```tsx
import { useState, type InputHTMLAttributes, type ReactElement } from "react";
import {
  Field,
  type FormSchema,
  type FormStore,
  type RequiredPath,
  type ValidPath,
} from "@formisch/react";
import type * as v from "valibot";
import { cn } from "@/lib/utils";
import { FieldLayout, type FieldSize } from "@/components/ui/field-layout";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icons";
import { useFormUi } from "@/components/ui/form";

type TextFieldProps<TSchema extends FormSchema, TFieldPath extends RequiredPath> = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "name" | "value" | "defaultValue" | "size"
> & {
  of: FormStore<TSchema>;
  path: ValidPath<v.InferInput<TSchema>, TFieldPath>;
  label: string;
  description?: string;
  size?: FieldSize;
};

const sizeClass: Record<FieldSize, string> = {
  sm: "h-9 rounded-sm px-3 text-sm",
  md: "h-11 rounded-sm px-3.5 text-sm",
};

export function TextField<TSchema extends FormSchema, TFieldPath extends RequiredPath>({
  of,
  path,
  label,
  description,
  size = "md",
  className,
  type = "text",
  required,
  disabled: disabledProp,
  ...props
}: TextFieldProps<TSchema, TFieldPath>): ReactElement {
  const { layout, disabled: formDisabled, requiredMark } = useFormUi();
  const [visible, setVisible] = useState(false);

  return (
    <Field of={of} path={path}>
      {(field) => {
        const isPassword = type === "password";
        const disabled = formDisabled || disabledProp;
        const describedBy =
          [
            description ? `${field.props.name}-description` : null,
            field.errors ? `${field.props.name}-error` : null,
          ]
            .filter(Boolean)
            .join(" ") || undefined;

        return (
          <FieldLayout
            name={field.props.name}
            label={label}
            description={description}
            required={required}
            requiredMark={requiredMark}
            layout={layout}
            errors={field.errors}
          >
            <div className={cn("relative min-w-0", layout === "inline" ? "w-52" : "w-full")}>
              <input
                {...props}
                {...field.props}
                id={field.props.name}
                required={required}
                disabled={disabled}
                type={isPassword && visible ? "text" : type}
                value={field.input ?? ""}
                aria-invalid={!!field.errors}
                aria-describedby={describedBy}
                className={cn(
                  "w-full border bg-input text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50",
                  field.errors ? "border-danger" : "border-border",
                  isPassword ? "pr-11" : null,
                  sizeClass[size],
                  className,
                )}
              />
              {isPassword ? (
                <button
                  type="button"
                  disabled={disabled}
                  className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground outline-none hover:text-foreground focus-visible:text-foreground disabled:cursor-not-allowed"
                  onClick={() => setVisible((value) => !value)}
                  aria-label={visible ? "Hide password" : "Show password"}
                >
                  {visible ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                </button>
              ) : null}
            </div>
          </FieldLayout>
        );
      }}
    </Field>
  );
}
```

If TypeScript complains that `field.input` is not a string for `value=`, coerce with `String(field.input ?? "")` only if needed. Do not add a public `input` prop.

- [ ] **Step 3: Replace `src/components/ui/checkbox.tsx`**

```tsx
import type { InputHTMLAttributes, ReactElement, ReactNode } from "react";
import {
  Field,
  type FormSchema,
  type FormStore,
  type RequiredPath,
  type ValidPath,
} from "@formisch/react";
import type * as v from "valibot";
import { cn } from "@/lib/utils";
import { FieldLayout, type FieldSize } from "@/components/ui/field-layout";
import { CheckIcon } from "@/components/ui/icons";
import { useFormUi } from "@/components/ui/form";

type CheckboxProps<TSchema extends FormSchema, TFieldPath extends RequiredPath> = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "name" | "value" | "defaultValue" | "type" | "size" | "checked"
> & {
  of: FormStore<TSchema>;
  path: ValidPath<v.InferInput<TSchema>, TFieldPath>;
  label: ReactNode;
  description?: string;
  size?: FieldSize;
};

const boxSize: Record<FieldSize, string> = {
  sm: "size-4 rounded",
  md: "size-5 rounded-md",
};

export function Checkbox<TSchema extends FormSchema, TFieldPath extends RequiredPath>({
  of,
  path,
  label,
  description,
  size = "md",
  className,
  required,
  disabled: disabledProp,
  ...props
}: CheckboxProps<TSchema, TFieldPath>): ReactElement {
  const { layout, disabled: formDisabled, requiredMark } = useFormUi();

  return (
    <Field of={of} path={path}>
      {(field) => {
        const disabled = formDisabled || disabledProp;
        const isChecked = field.input === true;
        const describedBy =
          [
            description ? `${field.props.name}-description` : null,
            field.errors ? `${field.props.name}-error` : null,
          ]
            .filter(Boolean)
            .join(" ") || undefined;

        const mark =
          required && requiredMark !== false ? (
            <span className="text-danger" aria-hidden="true">
              *
            </span>
          ) : null;

        const labelText = (
          <span className="leading-5">
            {requiredMark === "before" ? (
              <>
                {mark}
                {mark ? " " : null}
                {label}
              </>
            ) : (
              <>
                {label}
                {mark ? " " : null}
                {mark}
              </>
            )}
          </span>
        );

        return (
          <FieldLayout
            name={field.props.name}
            description={description}
            layout={layout}
            errors={field.errors}
          >
            <label className="flex cursor-pointer items-start gap-3 text-sm text-foreground">
              <span className="relative mt-0.5 inline-flex shrink-0">
                <input
                  {...props}
                  {...field.props}
                  type="checkbox"
                  checked={isChecked}
                  disabled={disabled}
                  required={required}
                  aria-invalid={!!field.errors}
                  aria-describedby={describedBy}
                  className="peer sr-only"
                />
                <span
                  className={cn(
                    "flex items-center justify-center border text-primary-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring/50 peer-disabled:opacity-50",
                    isChecked ? "border-primary bg-primary" : "border-border bg-input",
                    boxSize[size],
                    className,
                  )}
                  aria-hidden="true"
                >
                  {isChecked ? <CheckIcon className="size-3.5" /> : null}
                </span>
              </span>
              {labelText}
            </label>
          </FieldLayout>
        );
      }}
    </Field>
  );
}
```

Do not add a second exported visual-only checkbox.

- [ ] **Step 4: Delete the old scene trees listed in Files. Confirm none remain:**

```bash
ls src/components/examples/login src/components/examples/register src/site/pages/components/form/login src/site/pages/components/form/register 2>&1
```

Expected: `No such file or directory` for each.

- [ ] **Step 5: Replace Form catalog with a single route**

`src/site/pages/components/routes.ts`:

```ts
import type { RouteObject } from "react-router";
import { ComponentsCatalogPage } from "@/site/pages/components/page";
import { ButtonDocPage } from "@/site/pages/components/button/page";
import { FormDocPage } from "@/site/pages/components/form/page";

export const componentRoutes: RouteObject[] = [
  { index: true, Component: ComponentsCatalogPage },
  { path: "button", Component: ButtonDocPage },
  { path: "form", Component: FormDocPage },
];
```

`src/site/pages/components/form/page.tsx` (temporary; Task 4 replaces this file):

```tsx
export function FormDocPage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Form</h1>
      <p className="mt-2 text-muted-foreground">
        Copy-paste form UI wired to Formisch and Valibot.
      </p>
    </article>
  );
}
```

In `src/site/nav.ts`, delete `formCatalog` entirely. Change the Form `componentCatalog` description to: `"Copy-paste Formisch fields and a Form shell."`

Grep the repo (except `docs/`) for `formCatalog`, `@/components/examples/`, `form/login`, `form/register` and remove leftover imports.

- [ ] **Step 6: Typecheck and lint**

```bash
pnpm exec tsc -b --pretty false
pnpm lint
```

Expected: both exit 0.

- [ ] **Step 7: Commit**

Skip unless the user asked to commit.

---

### Task 3: First two demos

**Files:**

- Create: `src/site/pages/components/form/demos/basic.tsx`
- Create: `src/site/pages/components/form/demos/layout.tsx`
- Create: `src/site/pages/components/form/demos.ts`

**Interfaces:**

- Consumes: `Form` from `@/components/ui/form`, `TextField` from `@/components/ui/text-field`, `Button` from `@/components/ui/button`, `useForm` from `@formisch/react`
- Produces: `export const formDemos: { id: string; title: string; description: string; Component: ComponentType; code: string }[]` with exactly two entries, `id: "basic"` then `id: "layout"`

- [ ] **Step 1: Add `src/site/pages/components/form/demos/basic.tsx`**

The file must default-export the preview component, keep the schema in this file, and import only `react` / `@formisch/react` / `valibot` / `@/components/ui/...`.

```tsx
import { useForm } from "@formisch/react";
import type { SubmitEventHandler } from "@formisch/react";
import * as v from "valibot";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";

const schema = v.object({
  email: v.pipe(v.string(), v.nonEmpty("Please enter your email."), v.email("Please enter a valid email address.")),
});

export default function BasicDemo() {
  const form = useForm({
    schema,
    initialInput: { email: "" },
  });

  const onSubmit: SubmitEventHandler<typeof schema> = (output) => {
    console.log(output);
  };

  return (
    <Form of={form} layout="vertical" onSubmit={onSubmit} className="max-w-md">
      <div className="grid gap-4">
        <TextField of={form} path={["email"]} label="Email" type="email" placeholder="you@example.com" required />
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
}
```

- [ ] **Step 2: Add `src/site/pages/components/form/demos/layout.tsx`**

```tsx
import { useState } from "react";
import { useForm } from "@formisch/react";
import type { SubmitEventHandler } from "@formisch/react";
import * as v from "valibot";
import { Form, type FormLayout } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";

const schema = v.object({
  email: v.pipe(v.string(), v.nonEmpty("Please enter your email."), v.email("Please enter a valid email address.")),
});

const layouts: FormLayout[] = ["vertical", "horizontal", "inline"];

export default function LayoutDemo() {
  const [layout, setLayout] = useState<FormLayout>("vertical");
  const form = useForm({
    schema,
    initialInput: { email: "" },
  });

  const onSubmit: SubmitEventHandler<typeof schema> = (output) => {
    console.log(output);
  };

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-2">
        {layouts.map((value) => (
          <Button
            key={value}
            type="button"
            size="sm"
            appearance={layout === value ? "filled" : "outline"}
            onClick={() => setLayout(value)}
          >
            {value}
          </Button>
        ))}
      </div>
      <Form of={form} layout={layout} onSubmit={onSubmit} className="max-w-lg">
        <div className={layout === "inline" ? "flex flex-wrap items-end gap-3" : "grid gap-4"}>
          <TextField of={form} path={["email"]} label="Email" type="email" placeholder="you@example.com" required />
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </div>
  );
}
```

Each demo calls `useForm` inside its own component. Do not lift a shared form store to the page.

- [ ] **Step 3: Add `src/site/pages/components/form/demos.ts`**

```ts
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
```

- [ ] **Step 4: Typecheck**

```bash
pnpm exec tsc -b --pretty false
```

Expected: exit 0. If `?raw` modules fail to type, add `declare module "*.tsx?raw" { const src: string; export default src; }` to `src/vite-env.d.ts` (Button already uses `?raw`; match that pattern).

- [ ] **Step 5: Commit**

Skip unless the user asked to commit.

---

### Task 4: Form doc page host

**Files:**

- Modify: `src/site/pages/components/form/page.tsx` (replace the Task 2 stub)

**Interfaces:**

- Consumes: `formDemos` from `./demos`; `ExampleCard` from `@/components/common`; kit `?raw` sources
- Produces: `/components/form` long page with Copy the kit, in-page TOC from `formDemos`, example cards (omit `source` so the drawer is usage-only), API tables for `Form` / `TextField` / `Checkbox` plus a link to https://formisch.dev/react/api/useForm/

- [ ] **Step 1: Replace `src/site/pages/components/form/page.tsx`**

Use this structure. Keep class names in the existing olio-form token style (`text-foreground`, `border-border`, etc.).

```tsx
import { ExampleCard } from "@/components/common";
import { formDemos } from "@/site/pages/components/form/demos";
import formSource from "@/components/ui/form.tsx?raw";
import textFieldSource from "@/components/ui/text-field.tsx?raw";
import checkboxSource from "@/components/ui/checkbox.tsx?raw";
import fieldLayoutSource from "@/components/ui/field-layout.tsx?raw";
import buttonSource from "@/components/ui/button.tsx?raw";
import utilsSource from "@/lib/utils.ts?raw";
import { CodeBlock } from "@/components/common/code-block";

const kitFiles = [
  { path: "components/ui/form.tsx", code: formSource },
  { path: "components/ui/text-field.tsx", code: textFieldSource },
  { path: "components/ui/checkbox.tsx", code: checkboxSource },
  { path: "components/ui/field-layout.tsx", code: fieldLayoutSource },
  { path: "components/ui/button.tsx", code: buttonSource },
  { path: "lib/utils.ts", code: utilsSource },
] as const;

export function FormDocPage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Form</h1>
      <p className="mt-2 text-muted-foreground">
        Copy-paste form UI for Formisch and Valibot. You own the files.
      </p>

      <nav className="mt-8 flex flex-wrap gap-3 text-sm">
        <a href="#copy-the-kit" className="text-primary underline-offset-4 hover:underline">
          Copy the kit
        </a>
        {formDemos.map((demo) => (
          <a
            key={demo.id}
            href={`#form-demo-${demo.id}`}
            className="text-primary underline-offset-4 hover:underline"
          >
            {demo.title}
          </a>
        ))}
        <a href="#api" className="text-primary underline-offset-4 hover:underline">
          API
        </a>
      </nav>

      <section id="when-to-use" className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">When to use</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Collecting values that must match a Valibot schema before submit.</li>
          <li>Building a form from copy-paste fields wired to Formisch.</li>
        </ul>
      </section>

      <section id="copy-the-kit" className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">Copy the kit</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Install peers, then copy these files into the same paths in your app.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-muted/40 p-4 text-sm">
          <code>pnpm add @formisch/react valibot</code>
        </pre>
        <div className="mt-6 grid gap-4">
          {kitFiles.map((file) => (
            <ExampleCard key={file.path} title={file.path} preview={<CodeBlock code={file.code} />} code={file.code} />
          ))}
        </div>
      </section>

      <section id="examples" className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>
        <div className="mt-6 grid gap-8">
          {formDemos.map((demo) => {
            const Preview = demo.Component;
            return (
              <div key={demo.id} id={`form-demo-${demo.id}`}>
                <h3 className="text-lg font-semibold tracking-tight">{demo.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{demo.description}</p>
                <div className="mt-4">
                  <ExampleCard title={demo.title} preview={<Preview />} code={demo.code} layout="flush" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="api" className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">API</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Create the store with{" "}
          <a href="https://formisch.dev/react/api/useForm/" className="text-primary underline-offset-4 hover:underline">
            Formisch useForm
          </a>
          . Do not wrap it.
        </p>

        <h3 className="mt-8 text-base font-semibold">Form</h3>
        <div className="mt-3 overflow-x-auto text-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 pr-4 font-medium">Prop</th>
                <th className="py-2 pr-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">of</td>
                <td className="py-2">Formisch form store. Passed through.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">onSubmit</td>
                <td className="py-2">Formisch submit handler. Passed through.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">layout</td>
                <td className="py-2">vertical (default) | horizontal | inline</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">disabled</td>
                <td className="py-2">Disables fields in this form. Default false.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">requiredMark</td>
                <td className="py-2">before | after (default) | false</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-8 text-base font-semibold">TextField</h3>
        <div className="mt-3 overflow-x-auto text-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 pr-4 font-medium">Prop</th>
                <th className="py-2 pr-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">of</td>
                <td className="py-2">Formisch form store.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">path</td>
                <td className="py-2">Formisch path tuple, e.g. [&quot;email&quot;].</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">label</td>
                <td className="py-2">Required.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">required</td>
                <td className="py-2">Asterisk and ARIA only. Submit validity comes from the schema.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-8 text-base font-semibold">Checkbox</h3>
        <div className="mt-3 overflow-x-auto text-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 pr-4 font-medium">Prop</th>
                <th className="py-2 pr-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">of</td>
                <td className="py-2">Formisch form store.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">path</td>
                <td className="py-2">Formisch path tuple.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono">label</td>
                <td className="py-2">Required.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
```

Kit cards: if `ExampleCard` with a `CodeBlock` as `preview` looks wrong (double code), list kit paths as headings and a single `CodeBlock` under each instead of `ExampleCard`. Demo cards must use `ExampleCard` with `preview={<Preview />}` and **omit `source`**.

Do not list `setErrors` / `insert` in the API tables.

- [ ] **Step 2: Typecheck and lint**

```bash
pnpm exec tsc -b --pretty false
pnpm lint
```

Expected: both exit 0.

- [ ] **Step 3: Commit**

Skip unless the user asked to commit.

---

### Task 5: Site copy

**Files:**

- Modify: `src/site/pages/home.tsx`
- Modify: `README.md`
- Modify: `src/site/nav.ts` if the Form catalog blurb was not updated in Task 2

**Interfaces:**

- Consumes: none
- Produces: copy that describes a copy-paste Formisch kit and demo host, not Login/Register template pages

- [ ] **Step 1: Update home hero**

Replace the paragraph that calls olio-form “a catalog of Formisch + Valibot templates” with:

```tsx
<p className="mt-4 text-base text-muted-foreground md:text-lg">
  olio-form is copy-paste form UI for Formisch and Valibot. Copy the kit into
  your app, then copy a demo as a starting page. There is no UI package to install.
</p>
```

Replace the components-section subtitle “Copy these primitives first. Examples are composed from them.” with: `"Copy the kit, then copy a demo."`

- [ ] **Step 2: Update `README.md` Current scope**

Replace:

```
- Primitives: `Button`, `FieldLayout`, `TextField`, `Checkbox`
- Examples: Login, Register
```

with:

```
- Kit: `Form`, `TextField`, `Checkbox`, `Button`, `FieldLayout`
- Form docs: stacked demos (`basic`, `layout`) on `/components/form`
```

Replace “Copied files live under `src/components/ui`, `src/components/examples`, and `src/lib`.” with: “Copied files live under `src/components/ui` and `src/lib`. Demo usage files live under `src/site/pages/components/form/demos` and are not part of the kit.”

Leave “Not done yet” (Select, DateField, etc.) as-is.

- [ ] **Step 3: Typecheck**

```bash
pnpm exec tsc -b --pretty false
```

Expected: exit 0.

- [ ] **Step 4: Commit**

Skip unless the user asked to commit.

---

### Task 6: Browser verification

**Files:** none (manual)

- [ ] **Step 1: Start the app**

```bash
pnpm dev
```

Expected: Vite ready URL (typically `http://localhost:5173`).

- [ ] **Step 2: Click through**

- `/components/form` shows Copy the kit, TOC, Basic usage, Form layout, API.
- Each demo has its own form state (typing in Basic does not fill Layout).
- Layout buttons switch vertical / horizontal / inline on that demo only.
- Submit on Basic with an empty email shows the schema error under the field.
- Demo “View code” shows the demo file (imports `@/components/ui/form`, not `../text-field`).
- `/components/form/login` and `/components/form/register` render the site 404, not the old pages.
- `/components/button` still shows Filled / Ghost / Outline / Round cards.
- In-page TOC hashes (`#form-demo-basic`, `#copy-the-kit`, `#api`) scroll to the section.
- Browser back/forward still works.

- [ ] **Step 3: Commit**

Skip unless the user asked to commit.

---

## Spec coverage (self-review)

| Spec requirement | Task |
| --- | --- |
| Formisch unwrapped (`useForm` from `@formisch/react`) | 1, 3 |
| Copy-paste kit at `src/components/ui`, `@/` alias | 1–4 |
| Bound `TextField` / `Checkbox` (`of` + `path` + `label`) | 2 |
| Form shell: layout / disabled / requiredMark, no `FormUiProvider` | 1 |
| Demo = one file, own `useForm`, schema in file | 3 |
| Demo imports only react / formisch / valibot / `@/components/ui` | 3 |
| Card code = usage only (omit `source`) | 4 |
| Kit list at top of Form page | 4 |
| Single `/components/form` route; delete login/register | 2 |
| First demos exactly `basic` + `layout` | 3 |
| API tables without Formisch methods as olio APIs | 4 |
| Delete `src/components/examples/**` | 2 |
| README / home copy | 5 |
| `tsc` + lint + browser | 2, 4, 6 |
| No Turborepo / npm package / CLI / extra demos | all (omitted) |
