export type NavItem = {
  href: string;
};

export const headerLinks: NavItem[] = [{ href: "/components" }];

export type CatalogId = "button" | "form";

export type CatalogItem = {
  id: CatalogId;
  href: string;
};

export const componentCatalog: CatalogItem[] = [
  { id: "button", href: "/components/button" },
  { id: "form", href: "/components/form" },
];
