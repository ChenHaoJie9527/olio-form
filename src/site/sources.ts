import buttonSource from "@/components/ui/button/button.tsx?raw";
import buttonVariantsSource from "@/components/ui/button/variants.ts?raw";
import buttonVariantSource from "@/components/ui/button/variant.ts?raw";
import buttonSizeSource from "@/components/ui/button/size.ts?raw";
import buttonBaseSource from "@/components/ui/button/base.ts?raw";
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
  button: { path: "components/ui/button/button.tsx", code: buttonSource },
  buttonVariants: { path: "components/ui/button/variants.ts", code: buttonVariantsSource },
  buttonVariant: { path: "components/ui/button/variant.ts", code: buttonVariantSource },
  buttonSize: { path: "components/ui/button/size.ts", code: buttonSizeSource },
  buttonBase: { path: "components/ui/button/base.ts", code: buttonBaseSource },
  checkbox: { path: "components/ui/checkbox.tsx", code: checkboxSource },
  fieldLayout: { path: "components/ui/field-layout.tsx", code: fieldLayoutSource },
  icons: { path: "components/ui/icons.tsx", code: iconsSource },
  textField: { path: "components/ui/text-field.tsx", code: textFieldSource },
  utils: { path: "lib/utils.ts", code: utilsSource },
  tokens: { path: "styles/tokens.css", code: tokensSource },
} satisfies Record<string, SourceFile>;

const buttonFiles = [ui.button, ui.buttonVariants, ui.buttonVariant, ui.buttonSize, ui.buttonBase];

export const sources = {
  getStarted: [ui.tokens, ui.utils],
  button: [...buttonFiles, ui.icons, ui.utils],
  fieldLayout: [ui.fieldLayout, ui.utils],
  textField: [ui.textField, ui.fieldLayout, ui.icons, ui.utils],
  checkbox: [ui.checkbox, ui.fieldLayout, ui.icons, ui.utils],
  login: [
    { path: "components/examples/login/schema.ts", code: loginSchemaSource },
    { path: "components/examples/login/login-form.tsx", code: loginFormSource },
    ui.textField,
    ui.checkbox,
    ...buttonFiles,
    ui.fieldLayout,
    ui.icons,
    ui.utils,
  ],
  register: [
    { path: "components/examples/register/schema.ts", code: registerSchemaSource },
    { path: "components/examples/register/register-form.tsx", code: registerFormSource },
    ui.textField,
    ui.checkbox,
    ...buttonFiles,
    ui.fieldLayout,
    ui.icons,
    ui.utils,
  ],
} satisfies Record<string, SourceFile[]>;
