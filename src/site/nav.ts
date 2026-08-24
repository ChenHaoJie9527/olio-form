export type NavItem = {
  title: string;
  href: string;
};

export const headerLinks: NavItem[] = [
  { title: "Components", href: "/components" },
  { title: "Examples", href: "/examples" },
];

export type CatalogItem = {
  title: string;
  href: string;
  description: string;
};

export const componentCatalog: CatalogItem[] = [
  {
    title: "Button",
    href: "/components/button",
    description: "Submit and action button with variant, size, and loading.",
  },
  {
    title: "FieldLayout",
    href: "/components/field-layout",
    description: "Label, description, and error chrome shared by every field.",
  },
  {
    title: "TextField",
    href: "/components/text-field",
    description: "Native input wired through Formisch Field, including password visibility.",
  },
  {
    title: "Checkbox",
    href: "/components/checkbox",
    description: "Native checkbox with custom chrome. Formisch reads element.checked.",
  },
];

export const exampleCatalog: CatalogItem[] = [
  {
    title: "Login",
    href: "/examples/login",
    description: "Email, password, remember me, and a sample server error.",
  },
  {
    title: "Register",
    href: "/examples/register",
    description: "Email, password confirmation, and a required terms checkbox.",
  },
];
