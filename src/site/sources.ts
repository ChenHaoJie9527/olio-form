import buttonSource from "@/components/ui/button.tsx?raw";
import checkboxSource from "@/components/ui/checkbox.tsx?raw";
import fieldLayoutSource from "@/components/ui/field-layout.tsx?raw";
import iconsSource from "@/components/ui/icons.tsx?raw";
import textFieldSource from "@/components/ui/text-field.tsx?raw";
import utilsSource from "@/lib/utils.ts?raw";
import tokensSource from "@/styles/tokens.css?raw";
import loginFormSource from "@/components/examples/login/login-form.tsx?raw";
import loginSchemaSource from "@/components/examples/login/schema.ts?raw";
import registerFormSource from "@/components/examples/register/register-form.tsx?raw";
import registerSchemaSource from "@/components/examples/register/schema.ts?raw";
import type { SourceFile } from "@/site/code-panel";

const ui = {
  button: { path: "components/ui/button.tsx", code: buttonSource },
  checkbox: { path: "components/ui/checkbox.tsx", code: checkboxSource },
  fieldLayout: { path: "components/ui/field-layout.tsx", code: fieldLayoutSource },
  icons: { path: "components/ui/icons.tsx", code: iconsSource },
  textField: { path: "components/ui/text-field.tsx", code: textFieldSource },
  utils: { path: "lib/utils.ts", code: utilsSource },
  tokens: { path: "styles/tokens.css", code: tokensSource },
} satisfies Record<string, SourceFile>;

export const sources = {
  getStarted: [ui.tokens, ui.utils],
  button: [ui.button, ui.icons, ui.utils],
  fieldLayout: [ui.fieldLayout, ui.utils],
  textField: [ui.textField, ui.fieldLayout, ui.icons, ui.utils],
  checkbox: [ui.checkbox, ui.fieldLayout, ui.icons, ui.utils],
  login: [
    { path: "components/examples/login/schema.ts", code: loginSchemaSource },
    { path: "components/examples/login/login-form.tsx", code: loginFormSource },
    ui.textField,
    ui.checkbox,
    ui.button,
    ui.fieldLayout,
    ui.icons,
    ui.utils,
  ],
  register: [
    { path: "components/examples/register/schema.ts", code: registerSchemaSource },
    { path: "components/examples/register/register-form.tsx", code: registerFormSource },
    ui.textField,
    ui.checkbox,
    ui.button,
    ui.fieldLayout,
    ui.icons,
    ui.utils,
  ],
} satisfies Record<string, SourceFile[]>;
