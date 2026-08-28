export type NavItem = {
  href: string;
};

export const headerLinks: NavItem[] = [{ href: "/components" }];

export type CatalogId = "button" | "text-field" | "form";

export type CatalogItem = {
  id: CatalogId;
  href: string;
};

export const componentCatalog: CatalogItem[] = [
  { id: "button", href: "/components/button" },
  { id: "text-field", href: "/components/text-field" },
  { id: "form", href: "/components/form" },
];
