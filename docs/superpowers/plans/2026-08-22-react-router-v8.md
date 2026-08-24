# React Router v8 Data Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homemade History SPA router with React Router v8 Data Mode without changing URLs, layout, or page content.

**Architecture:** A pathless layout route renders `DocsLayout` with `<Outlet />`. Child route objects map 1:1 to the current `switch(path)` pages. `createBrowserRouter` is created once at module scope in `App.tsx` and passed to `RouterProvider` from `react-router/dom`. Homemade `router.tsx` / `router-context.tsx` are deleted.

**Tech Stack:** `react-router` 8.x, Vite 8, React 19, TypeScript. No `@react-router/dev`, no `react-router-dom` package, no new test framework.

## Global Constraints

- Package: `react-router` latest 8.x (8.3.0 or newer 8.x). Do not add `react-router-dom` as a separate dependency.
- Imports: `createBrowserRouter` from `react-router`; `RouterProvider` from `react-router/dom`.
- Create the router instance once, outside any React component. Do not store it in state or recreate it during render.
- Keep Vite + React 19. Do not add `@react-router/dev`.
- Do not introduce a test framework. Verify with TypeScript, oxlint, and a manual click-through of existing links.
- Do not add route `loader` / `action` / `lazy` in this change.
- `nav.ts` `href` strings stay as path values. Only React Router `Link`/`NavLink` props change from `href` to `to`.
- Do not set `end` on header/mobile `NavLink`s (prefix matching must match today's `isActive`).
- Spec: `docs/superpowers/specs/2026-08-22-react-router-v8-design.md`.
- This repo only commits when the human explicitly asks. Skip every Commit step unless they have asked in this conversation.

## File map

- Modify: `package.json` / lockfile — add `react-router`.
- Modify: `src/App.tsx` — official `RouterProvider` + module-scope router.
- Modify: `src/site/pages/routes.tsx` — `RouteObject[]` named `routes`; named page wrappers; no `AppRoutes`.
- Modify: `src/site/layout.tsx` — `Outlet`, `NavLink`, `Link`, `useLocation`.
- Modify: `src/site/pages/home.tsx`, `src/site/catalog.tsx` — official `Link` + `to`.
- Delete: `src/site/router.tsx`, `src/site/router-context.tsx`.

---

### Task 1: Install react-router 8

**Files:**

- Modify: `package.json`
- Modify: lockfile (`package-lock.json` or `pnpm-lock.yaml`, whichever exists)

**Interfaces:**

- Consumes: none
- Produces: `react-router` 8.x available to import from `react-router` and `react-router/dom`

- [ ] **Step 1: Confirm package manager**

Run from repo root:

```bash
ls package-lock.json pnpm-lock.yaml yarn.lock bun.lock 2>/dev/null
```

Use npm if `package-lock.json` exists, pnpm if `pnpm-lock.yaml`, etc.

- [ ] **Step 2: Install the package (do not add `react-router-dom`)**

npm:

```bash
npm install react-router
```

Expected: `package.json` `dependencies` includes `"react-router": "^8..."` (8.3.0 or newer 8.x). No `react-router-dom` key.

- [ ] **Step 3: Typecheck still passes on the pre-migration tree**

```bash
npx tsc -b --pretty false
```

Expected: exit 0.

- [ ] **Step 4: Commit**

Skip unless the user asked to commit.

```bash
git add package.json package-lock.json
git commit -m "$(cat <<'EOF'
chore: add react-router 8

EOF
)"
```

---

### Task 2: Replace homemade router with Data Mode

Do this task as one swap so the app never imports both routers. After this task, homemade router files are gone and TypeScript must pass.

**Files:**

- Modify: `src/site/pages/routes.tsx`
- Modify: `src/App.tsx`
- Modify: `src/site/layout.tsx`
- Modify: `src/site/pages/home.tsx`
- Modify: `src/site/catalog.tsx`
- Delete: `src/site/router.tsx`
- Delete: `src/site/router-context.tsx`

**Interfaces:**

- Consumes: `react-router` from Task 1; existing page components (`HomePage`, `GetStartedPage`, `CatalogPage`, `DocPage`, demos, example forms, `sources`, catalogs in `nav.ts`)
- Produces: `export const routes: RouteObject[]` from `@/site/pages/routes`; `DocsLayout` with no props, rendering `<Outlet />`; site links use `to` not `href`

- [ ] **Step 1: Rewrite `src/site/pages/routes.tsx`**

Replace the entire file with:

```tsx
import type { RouteObject } from "react-router";
import { ButtonDemo, CheckboxDemo, FieldLayoutDemo, TextFieldDemo } from "@/site/demos";
import { CatalogPage } from "@/site/catalog";
import { DocPage } from "@/site/doc-page";
import { GetStartedPage } from "@/site/pages/get-started";
import { HomePage } from "@/site/pages/home";
import { LoginForm } from "@/components/examples/login/login-form";
import { RegisterForm } from "@/components/examples/register/register-form";
import { DocsLayout } from "@/site/layout";
import { componentCatalog, exampleCatalog } from "@/site/nav";
import { sources } from "@/site/sources";

function ComponentsCatalogPage() {
  return (
    <CatalogPage
      title="Components"
      description="Copy these primitives first. Examples are composed from them."
      items={componentCatalog}
    />
  );
}

function ExamplesCatalogPage() {
  return (
    <CatalogPage
      title="Examples"
      description="Full scenes with a Valibot schema and Formisch wiring."
      items={exampleCatalog}
    />
  );
}

function ButtonDocPage() {
  return (
    <DocPage
      title="Button"
      description="Submit and action button with loading and size variants."
      preview={<ButtonDemo />}
      files={sources.button}
    />
  );
}

function FieldLayoutDocPage() {
  return (
    <DocPage
      title="FieldLayout"
      description="Label, description, and error chrome shared by every field."
      preview={<FieldLayoutDemo />}
      files={sources.fieldLayout}
    />
  );
}

function TextFieldDocPage() {
  return (
    <DocPage
      title="TextField"
      description="Native input wired through Formisch Field. Password fields include a visibility toggle."
      preview={<TextFieldDemo />}
      files={sources.textField}
    >
      <p className="text-muted-foreground">
        Spread <code className="rounded bg-muted px-1.5 py-0.5">field.props</code> and pass{" "}
        <code className="rounded bg-muted px-1.5 py-0.5">input</code> plus{" "}
        <code className="rounded bg-muted px-1.5 py-0.5">errors</code>. Do not keep a second value
        in local state.
      </p>
    </DocPage>
  );
}

function CheckboxDocPage() {
  return (
    <DocPage
      title="Checkbox"
      description="Native checkbox with custom chrome. Formisch reads element.checked."
      preview={<CheckboxDemo />}
      files={sources.checkbox}
    />
  );
}

function LoginDocPage() {
  return (
    <DocPage
      title="Login"
      description="Email, password, remember me, and a sample server error for blocked@example.com."
      preview={<LoginForm />}
      files={sources.login}
    />
  );
}

function RegisterDocPage() {
  return (
    <DocPage
      title="Register"
      description="Email, password, confirm password, and a required terms checkbox."
      preview={<RegisterForm />}
      files={sources.register}
    />
  );
}

function NotFoundPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Not found</h1>
      <p className="mt-2 text-muted-foreground">That page is not part of the first slice.</p>
    </article>
  );
}

export const routes: RouteObject[] = [
  {
    Component: DocsLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "docs", Component: GetStartedPage },
      { path: "components", Component: ComponentsCatalogPage },
      { path: "examples", Component: ExamplesCatalogPage },
      { path: "components/button", Component: ButtonDocPage },
      { path: "components/field-layout", Component: FieldLayoutDocPage },
      { path: "components/text-field", Component: TextFieldDocPage },
      { path: "components/checkbox", Component: CheckboxDocPage },
      { path: "examples/login", Component: LoginDocPage },
      { path: "examples/register", Component: RegisterDocPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
];
```

Do not export `AppRoutes`. Do not import `useRouter`.

- [ ] **Step 2: Rewrite `src/App.tsx`**

Replace the entire file with:

```tsx
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { routes } from "@/site/pages/routes";

const router = createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}
```

`const router` must stay at module scope, not inside `App`.

- [ ] **Step 3: Rewrite `src/site/layout.tsx`**

Keep `useDarkMode` unchanged. Remove `isActive`. Drop the `children` prop. Full file:

```tsx
import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { headerLinks } from "@/site/nav";

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    return (
      document.documentElement.classList.contains("dark") ||
      localStorage.getItem("olio-theme") === "dark"
    );
  });

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("olio-theme", next ? "dark" : "light");
  };

  return { dark, toggle };
}

export function DocsLayout() {
  const { pathname } = useLocation();
  const { dark, toggle } = useDarkMode();
  const [open, setOpen] = useState(false);
  const [openForPath, setOpenForPath] = useState(pathname);

  if (openForPath !== pathname) {
    setOpenForPath(pathname);
    setOpen(false);
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto grid h-16 max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 md:px-6">
          <Link to="/" className="text-sm font-semibold tracking-tight">
            olio-form
          </Link>

          <nav className="hidden items-center justify-center gap-6 md:flex">
            {headerLinks.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "text-sm",
                    isActive
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )
                }
              >
                {item.title}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-md border border-border"
              onClick={toggle}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <Link
              to="/docs"
              className="hidden h-9 items-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 md:inline-flex"
            >
              Get started
            </Link>
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-md border border-border md:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close navigation" : "Open navigation"}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="border-t border-border px-4 py-3 md:hidden">
            <nav className="grid gap-1">
              {headerLinks.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "rounded-md px-2 py-2 text-sm",
                      isActive ? "bg-muted font-medium text-foreground" : "text-muted-foreground",
                    )
                  }
                >
                  {item.title}
                </NavLink>
              ))}
              <Link
                to="/docs"
                className="mt-1 inline-flex h-10 items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground"
              >
                Get started
              </Link>
            </nav>
          </div>
        ) : null}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6">
          <nav className="flex flex-wrap gap-4 text-sm">
            {headerLinks.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-muted-foreground hover:text-foreground"
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <p className="max-w-xl text-xs text-muted-foreground">
            Site structure inspired by{" "}
            <a
              href="https://www.figma.com/design/oMHRevfhOXyaIuMQjyPnw7/Website-Wireframes-UI-Kit--Community-"
              className="underline-offset-4 hover:underline"
            >
              Website Wireframes UI Kit
            </a>
            . Form visuals inspired by{" "}
            <a
              href="https://www.figma.com/community/file/1148375559326132425/essential-forms-controls-ui-kit"
              className="underline-offset-4 hover:underline"
            >
              Essential Forms &amp; Controls UI Kit
            </a>{" "}
            (CC BY 4.0). Form state by{" "}
            <a href="https://formisch.dev/" className="underline-offset-4 hover:underline">
              Formisch
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
```

Do not put `end` on those `NavLink`s.

- [ ] **Step 4: Point home and catalog `Link`s at react-router**

In `src/site/pages/home.tsx`, change the import and every `href=` on `Link` to `to=`:

```tsx
import { Link } from "react-router";
```

```tsx
<Link
  to="/examples"
  className="inline-flex h-11 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
>
  Browse examples
</Link>
<Link
  to="/docs"
  className="inline-flex h-11 items-center rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground hover:bg-muted"
>
  Get started
</Link>
```

```tsx
<Link to="/examples" className="hidden text-sm font-medium text-primary sm:inline">
  View all
</Link>
```

Leave `exampleCatalog.map` `key={item.href}` as-is.

In `src/site/catalog.tsx`:

```tsx
import { Link } from "react-router";
import type { CatalogItem } from "@/site/nav";

export function CatalogCard({ item }: { item: CatalogItem }) {
  return (
    <Link
      to={item.href}
      className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:bg-muted/40"
    >
```

Do not rename `CatalogItem.href` in `nav.ts`.

- [ ] **Step 5: Delete homemade router files**

Delete `src/site/router.tsx` and `src/site/router-context.tsx`.

- [ ] **Step 6: Confirm no leftover homemade imports**

```bash
rg "@/site/router" src
```

Expected: no matches. (`@/site/router-context` is covered by that pattern.)

- [ ] **Step 7: Typecheck**

```bash
npx tsc -b --pretty false
```

Expected: exit 0. If `RouteObject` or `react-router/dom` fails, check `react-router` is 8.x and the import paths match this plan; do not add `react-router-dom`.

- [ ] **Step 8: Lint**

```bash
npm run lint
```

Expected: exit 0. Fix only issues introduced by this task.

- [ ] **Step 9: Commit**

Skip unless the user asked to commit.

```bash
git add src/App.tsx src/site/pages/routes.tsx src/site/layout.tsx src/site/pages/home.tsx src/site/catalog.tsx
git rm src/site/router.tsx src/site/router-context.tsx
git commit -m "$(cat <<'EOF'
refactor: switch site routing to react-router 8 data mode

EOF
)"
```

---

### Task 3: Manual verification

**Files:** none (runtime check)

**Interfaces:**

- Consumes: Task 2 app
- Produces: confirmation that URLs and chrome still match the spec table

- [ ] **Step 1: Start the dev server if it is not already running**

```bash
npm run dev
```

Expected: Vite serves the app (typically `http://localhost:5173`).

- [ ] **Step 2: Click through these URLs (or open them directly)**

| URL                        | Expected                                                                       |
| -------------------------- | ------------------------------------------------------------------------------ |
| `/`                        | HomePage                                                                       |
| `/docs`                    | GetStartedPage                                                                 |
| `/components`              | Components catalog                                                             |
| `/examples`                | Examples catalog                                                               |
| `/components/button`       | Button DocPage                                                                 |
| `/components/field-layout` | FieldLayout DocPage                                                            |
| `/components/text-field`   | TextField DocPage including the extra usage paragraph                          |
| `/components/checkbox`     | Checkbox DocPage                                                               |
| `/examples/login`          | Login DocPage                                                                  |
| `/examples/register`       | Register DocPage                                                               |
| `/does-not-exist`          | “Not found” / “That page is not part of the first slice.” inside header+footer |

Also check: header `Components` is active on `/components/button`; mobile menu closes after a nav tap; browser Back returns to the previous page without a full reload.

- [ ] **Step 3: Commit**

No code change. Skip.
