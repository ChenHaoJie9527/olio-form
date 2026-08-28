# olio-form

Copy-paste form UI for [Formisch](https://formisch.dev/) and [Valibot](https://valibot.dev/). You own the files. There is no UI package to install.

**Status: early / incomplete.** This is a public WIP snapshot, not a finished catalog.

## Current scope

- Site chrome (marketing layout, no docs sidebar)
- Kit: `Form`, `TextField`, `Checkbox`, `Button`, `FieldLayout`, `icons`
- Form docs: stacked demos (`basic`, `layout`) on `/components/form`

## Run locally

```bash
pnpm install
pnpm dev
```

Other scripts: `pnpm build`, `pnpm lint`, `pnpm fmt`.

Copied files live under `src/components/ui` and `src/lib`. Demo usage files live under `src/site/pages/components/form/demos` and are not part of the kit. The docs site in `src/site` is not part of the copy-paste contract.

## Not done yet

- Select, Dialog, DateField, Textarea, Radio, Switch
- Admin and modal form examples
- CI, hosted docs deploy

## License

MIT. Form visuals inspired by [Essential Forms & Controls UI Kit](https://www.figma.com/community/file/1148375559326132425/essential-forms-controls-ui-kit) (CC BY 4.0). Site structure inspired by [Website Wireframes UI Kit](https://www.figma.com/design/oMHRevfhOXyaIuMQjyPnw7/Website-Wireframes-UI-Kit--Community-).
