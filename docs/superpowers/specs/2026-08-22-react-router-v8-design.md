# Replace custom SPA router with React Router v8 Data Mode

Date: 2026-08-22

## Goal

Replace the homemade History SPA router (`src/site/router.tsx`, `src/site/router-context.tsx`, `switch(path)` in `AppRoutes`) with React Router v8 Data Mode. Site URLs, layout, and page content stay the same. No loaders, actions, lazy routes, or Framework Mode.

## Constraints

- Package: `react-router` latest 8.x (8.3.0 or newer 8.x). Do not add `react-router-dom` as a separate dependency.
- Imports: `createBrowserRouter` from `react-router`; `RouterProvider` from `react-router/dom` (wires `react-dom` `flushSync`).
- Create the router instance once, outside any React component. Do not store it in state or recreate it during render.
- Keep Vite + React 19. Do not add `@react-router/dev`.
- Do not introduce a test framework. Verify with TypeScript, oxlint, and a manual click-through of existing links.
- Do not add route `loader` / `action` / `lazy` in this change.
- `nav.ts` `href` strings stay as path values (`/components`, etc.). Only React Router `Link`/`NavLink` props change from `href` to `to`.

## Current behavior to preserve

| URL | UI |
| --- | --- |
| `/` | `HomePage` |
| `/docs` | `GetStartedPage` |
| `/components` | `CatalogPage` for `componentCatalog` |
| `/examples` | `CatalogPage` for `exampleCatalog` |
| `/components/button` | Button `DocPage` |
| `/components/field-layout` | FieldLayout `DocPage` |
| `/components/text-field` | TextField `DocPage` (including the extra usage paragraph) |
| `/components/checkbox` | Checkbox `DocPage` |
| `/examples/login` | Login `DocPage` |
| `/examples/register` | Register `DocPage` |
| anything else | Not found copy inside the site layout |

Header active state: a header link is active when `pathname === href` or `pathname.startsWith(href + "/")`. `NavLink` default matching is equivalent; do not set `end` on those header/mobile links.

Logo, Get started, footer links, home CTAs, and catalog cards are plain links (no active styling required).

Mobile drawer closes when the path changes.

Cmd/Ctrl/Shift/Alt/middle-click on links must keep native browser behavior. Official `Link`/`NavLink` already do this.

## Architecture

Pathless layout route owns `DocsLayout`. Child routes render through `<Outlet />` in `<main>`.

```
createBrowserRouter([
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
])
```

`*` sits under the layout so 404 still has header and footer.

Data flow: click `Link`/`NavLink` → Data Router updates History → match the route tree → render `DocsLayout` with the matched child in `Outlet`. Back/forward is handled by React Router. No custom `popstate` listener.

## File changes

### Add

- `react-router` dependency in `package.json`.

### Modify

**`src/App.tsx`**

- Import `createBrowserRouter` from `react-router` and `RouterProvider` from `react-router/dom`.
- Import `routes` from `@/site/pages/routes`.
- `const router = createBrowserRouter(routes)` at module scope.
- Default export renders `<RouterProvider router={router} />` only.
- Remove imports of homemade `RouterProvider`, `DocsLayout`, and `AppRoutes`.

**`src/site/pages/routes.tsx`**

- Stop exporting `AppRoutes`.
- Export `routes` as `RouteObject[]` from `react-router`.
- Keep existing page JSX; wrap catalog/doc pages that currently take inline props in named function components in this file (`ComponentsCatalogPage`, `ButtonDocPage`, etc.).
- Extract the current default branch into `NotFoundPage`.

**`src/site/layout.tsx`**

- Drop `children`. Render `<Outlet />` in `<main>`.
- Import `Link`, `NavLink`, `Outlet`, `useLocation` from `react-router`.
- Replace homemade `Link` / `useRouter`.
- Remove `isActive` helper.
- Header and mobile nav items: `NavLink` with `to={item.href}` and `className={({ isActive }) => ...}` using the same class strings as today.
- Logo, Get started, footer: `Link` with `to`.
- Close the mobile menu when `useLocation().pathname` changes (same render-time reset pattern as today, keyed off pathname).

**`src/site/pages/home.tsx`** and **`src/site/catalog.tsx`**

- Import `Link` from `react-router`.
- Change `href` to `to`. Leave `nav.ts` item field named `href`.

### Delete

- `src/site/router.tsx`
- `src/site/router-context.tsx`

No remaining imports of `@/site/router` or `@/site/router-context`.

## Out of scope

- Framework Mode / Vite plugin
- `loader`, `action`, `lazy`
- Dynamic params
- Custom `errorElement` / error boundary
- Production host rewrite rules (Vite dev already falls back to `index.html`)
- Renaming `nav.ts` `href` fields
- Visual/copy changes

## Verification

1. `npx tsc -b --pretty false` succeeds.
2. `npm run lint` succeeds.
3. In `npm run dev`: home, docs, both catalogs, every doc page, an unknown URL, header active styles, mobile menu close on navigate, browser back/forward.
