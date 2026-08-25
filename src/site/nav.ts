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
];


