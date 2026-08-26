export type NavItem = {
  title: string;
  href: string;
};

export const headerLinks: NavItem[] = [
  { title: "Components", href: "/components" },
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
    title: "Form",
    href: "/components/form",
    description: "Copy-paste form templates wired with Formisch and Valibot.",
  },
];

export const formCatalog: CatalogItem[] = [
  {
    title: "Login",
    href: "/components/form/login",
    description: "Email, password, remember me, and a sample server error.",
  },
  {
    title: "Register",
    href: "/components/form/register",
    description: "Email, password confirmation, and a required terms checkbox.",
  },
];


