# Form library architecture: copy-paste kit + Ant-style demo host

Date: 2026-08-28

## Goal

Rebuild the docs information architecture so Form is a single component page of stacked, copyable demos (Ant Design Form page pattern), not a gallery of scene routes. Ship a small copy-paste form kit on Formisch: bound field components plus a Form shell. First version proves the host and the public interface. More demos and controls are added later as files, without changing the architecture.

## Product decisions (locked)

- Engine: Formisch (`@formisch/react`) + Valibot. Do not wrap `useForm`, `setErrors`, `insert`, `reset`, or other methods. Callers import those from Formisch.
- Distribution: copy-paste. Users own the files. There is no `@olio/form` npm package.
- Fields: all-in-one bound controls. `<TextField of={form} path={["email"]} label="Email" />` hides Formisch `Field` wiring. These controls are form-only; no optional-`of` union that also works as a naked input.
- Docs: one route per component, many demos on that page. A demo is first-class: one file, one live preview, one copyable usage snippet.
- First version does not implement ~40 Ant Design demos. Empty placeholder titles are forbidden. Adding a demo later is a new file plus one catalog entry.

## Constraints

- Stay on the current Vite + React 19 app for this version. Do not introduce Turborepo, a published workspace package, or a CLI.
- `registry/` as a separate top-level package is deferred. Kit files stay at `src/components/ui` so `@/components/ui/...` in demo source is the same path users paste into their app.
- Demo files live next to the Form doc page, not inside the kit.
- Do not add a test framework. Verify with TypeScript, oxlint, and a browser pass of the Form page.
- Do not invent a second addressing scheme (`name="email"` as the data path). Keep Formisch `path={["email"]}`.
- Do not document Formisch methods as olio-form API.
- Site copy stays English, matching the current olio-form docs.

## Architecture

Two copy surfaces, one Vite app:

```
src/components/ui/          # kit — copy once into the user's components/ui
  form.tsx
  text-field.tsx
  checkbox.tsx
  field-layout.tsx          # dependency of fields; demos do not import it
  button.tsx                # existing; listed on Form page if a demo uses it
  icons.tsx
src/lib/utils.ts            # cn; listed in the kit copy block
src/site/pages/components/form/
  page.tsx                  # long Form doc page
  demos.ts                  # ordered catalog (the only demo registry)
  demos/
    basic.tsx
    layout.tsx
```

`apps/docs` as a real workspace package is out of scope until this layout is running.

Data flow:

1. User copies kit files into `@/components/ui` and `@/lib/utils`, and installs `react`, `@formisch/react`, `valibot`.
2. User copies a demo file as a page. That file imports Formisch, Valibot, and `@/components/ui/*` only.
3. The docs site uses the same `@` alias (`src/`), so the string shown in the code drawer is the module graph the preview actually runs.

## Demo convention

A demo file must:

1. Default-export a React component that is the preview.
2. Call `useForm` inside that component (each card on the page is an isolated form store).
3. Keep its Valibot schema in the same file.
4. Import only `react`, `@formisch/react`, `valibot`, and `@/components/ui/...` (and `@/lib/utils` only if the usage snippet truly needs `cn`; prefer not).
5. Use bound controls. No Formisch `<Field>` render props in demo source.

Forbidden in demo files:

- Splitting one demo across `schema.ts` / `styles.ts` / `form-provider.tsx`
- Relative imports such as `../text-field` or `@/components/examples/...`
- Imports from `@/site/...`
- Sharing one form store across demos

Registration is an ordered array in `demos.ts`. The Form page and the in-page TOC both read this array. Adding a demo is: new file under `demos/` + one object in the array.

```ts
import Basic from "./demos/basic";
import basicCode from "./demos/basic.tsx?raw";

export const formDemos = [
  {
    id: "basic",
    title: "Basic usage",
    description: "Schema, useForm, submit.",
    Component: Basic,
    code: basicCode,
  },
];
```

Anchor ids are `#form-demo-${id}` (for example `#form-demo-basic`).

Card code drawer shows **only** the demo file (usage). Kit implementation is not repeated per card.

## Public interface

Callers write this. Demos use the same shape.

```tsx
import { useForm, setErrors } from "@formisch/react";
import type { SubmitEventHandler } from "@formisch/react";
import * as v from "valibot";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";
import { Checkbox } from "@/components/ui/checkbox";

const schema = v.object({
  email: v.pipe(v.string(), v.email()),
  rememberMe: v.boolean(),
});

function Example() {
  const form = useForm({
    schema,
    initialInput: { email: "", rememberMe: false },
  });

  const onSubmit: SubmitEventHandler<typeof schema> = (output) => {
    void output;
  };

  return (
    <Form of={form} layout="vertical" onSubmit={onSubmit}>
      <TextField of={form} path={["email"]} label="Email" type="email" required />
      <Checkbox of={form} path={["rememberMe"]} label="Remember me" />
    </Form>
  );
}
```

### Form

Wraps Formisch `<Form>` and provides UI context to descendants.

| Prop | Role |
| --- | --- |
| `of`, `onSubmit` | Passed through to Formisch `<Form>`. Same types. |
| `layout` | `"vertical"` (default) \| `"horizontal"` \| `"inline"` |
| `disabled` | Disables fields in this form. Default `false`. |
| `requiredMark` | `"before"` \| `"after"` (default) \| `false` |
| `className` and native `<form>` extras Formisch already forwards | Visual / DOM |

Do not export `FormUiProvider`. Layout, disabled, and required-mark context stay internal to `form.tsx`.

### TextField and Checkbox

| Prop | Role |
| --- | --- |
| `of`, `path` | Same generics and path tuples as Formisch `Field`. Type errors when the path is not in the schema. |
| `label` | Required. |
| `required` | Asterisk and ARIA only. Submit validity still comes from the schema. |
| Control-specific UI | `type`, `placeholder`, `autoComplete`, `description`, `disabled`, `className`, native extras that do not collide with Formisch field props. |

They do **not** take `errors`, `input`, or `field.props`. Those are read internally via Formisch `Field` / `useField`.

No unbound mode: omitting `of` is a type error. A future naked `Input` would be a separate kit file.

Submit actions use the existing `Button` with `type="submit"`. Button is not welded into `Form`.

### What stays Formisch

`useForm`, `setErrors`, `insert`, `remove`, `reset`, `validate`, `getInput`, and the rest. Demos that need server errors import `setErrors` from `@formisch/react` in the demo file.

## Form doc page

Route: `/components/form` only. Delete `/components/form/login` and `/components/form/register`.

Page sections, in order:

1. Title and a short “when to use”.
2. **Copy the kit** — npm deps plus a hand-written file list of the form kit this page publishes (not inferred from demo imports). First version: `form.tsx`, `text-field.tsx`, `checkbox.tsx`, `field-layout.tsx`, `lib/utils.ts`, and `button.tsx` because the demos use submit buttons. Each kit file may have its own source drawer. No import-graph extraction.
3. **Examples** — map `formDemos` to cards (preview, title, description, usage source). Use existing `ExampleCard` and omit the `source` prop so the drawer is only the demo file. Do not change Button cards in this version.
4. **API** — tables for `Form`, `TextField`, `Checkbox` props as defined above, plus a link to Formisch `useForm`. Do not list `setErrors` / `insert` as olio-form APIs.

In-page TOC is generated from `formDemos` (and the Copy / API headings). A site-wide docs sidebar is out of scope.

### First-version demos

Exactly two entries, enough to prove the host:

- `basic` — schema, `useForm`, vertical `Form`, one `TextField`, submit `Button`.
- `layout` — same fields; a local control switches `layout` among vertical / horizontal / inline.

Do not add empty slots for disabled, required mark, login, or register. Those become new files later. Existing login/register implementations are migration sources, not first-version catalog entries.

## Error handling

- Schema errors: Valibot messages on the schema; bound fields render Formisch `field.errors` under the control via `field-layout`.
- Server / extra errors: `setErrors` from Formisch inside the demo (or the caller’s app). Not a kit API.
- Form-level `disabled` sets context; fields also honor their own `disabled` prop (`form disabled || field disabled`).

## Testing and verification

No new test runner.

1. `pnpm exec tsc -b --pretty false` succeeds.
2. `pnpm lint` succeeds.
3. In `pnpm dev`: `/components/form` shows kit block, TOC, two demos, isolated form state per card, usage drawer matches the running demo, kit paths match `@/components/ui/...`. `/components/form/login` and `/components/form/register` 404 inside the site layout. `/components/button` still works. Browser back/forward and in-page anchors work.

## Current repo → this architecture

Keep the engine, the visual language, and Button’s stacked-card host. Tear down Form-as-catalog and the multi-file login example.

| Current | After |
| --- | --- |
| `src/components/ui/button.tsx`, Button doc page with `ExampleCard` | Keep. Button cards may still show component source; Form cards do not. |
| `src/components/ui/field-layout.tsx` | Keep as a kit dependency. Demos do not import it. |
| `src/components/ui/text-field.tsx` | Replace with bound `of` + `path` + `label`. Drop `errors` / `input` / `FieldElementProps` as public props. |
| `src/components/ui/checkbox.tsx` | One bound public `Checkbox` in this file (`of` + `path` + `label`). Visual markup stays in the same file and is not a second export. |
| `src/components/ui/icons.tsx`, `src/lib/utils.ts` | Keep. Listed in the kit copy block when a field uses them. |
| `src/components/examples/login/*` (form, schema, provider, context, styles, field-frame, text-field, checkbox) | Delete as a package. Absorb layout/disabled/required-mark into `form.tsx`. Absorb bound field behavior into `ui/text-field` and `ui/checkbox`. Login scene is not a first-version demo; code may be referenced when adding `demos/login.tsx` later. |
| `src/components/examples/register/*` | Delete. Same as login. |
| `/components/form` catalog cards + `/components/form/login` + `/register` | Single `/components/form` long page. Remove those child routes from `componentRoutes` and `formCatalog`. |
| `formCatalog` in `nav.ts` | Remove. `componentCatalog` Form entry stays, pointing at `/components/form`. |
| `DocPage` single-preview layout for Login/Register | Form page does not use a single framed preview. It uses stacked cards like Button. |
| `FormUiProvider` / `useFormUi` as example-only context | Internal to `form.tsx`. Not part of the copyable usage surface. |

Home and README still describe copy-paste Formisch UI. Update any copy that calls Form a “template catalog” of Login/Register pages.

## Out of scope

- npm-published UI package, CLI, or shadcn-style registry JSON
- Wrapping Formisch `useForm` / methods
- Textarea, Select, Radio, Switch, DateField, FieldArray
- Login/register/modal/search as first-version demos
- Docs sidebar, i18n, Ant Design–scale API/FAQ
- Inlining kit source into demo files, or showing a generated “single file” that is not what the preview runs
- Turbo / `apps/docs` workspace split
- Request/mutation helpers (`onSubmit` → fetch → `setErrors`)

## File changes (this version)

### Add

- `src/components/ui/form.tsx` — Formisch `<Form>` + internal UI context.
- `src/site/pages/components/form/demos.ts`
- `src/site/pages/components/form/demos/basic.tsx`
- `src/site/pages/components/form/demos/layout.tsx`

### Modify

- `src/components/ui/text-field.tsx` — bound public API.
- `src/components/ui/checkbox.tsx` — one bound public `Checkbox`; visual markup stays private in the same file.
- `src/site/pages/components/form/page.tsx` — long doc page (copy kit, TOC, demos, API).
- `src/site/pages/components/routes.ts` — Form is a single route, no children.
- `src/site/nav.ts` — drop `formCatalog`.
- README / home copy if it still describes Form as Login/Register templates. `ExampleCard` stays as-is; Form demos omit `source`.

### Delete

- `src/components/examples/login/**`
- `src/components/examples/register/**`
- `src/site/pages/components/form/login/**`
- `src/site/pages/components/form/register/**`

No remaining imports of those trees.
