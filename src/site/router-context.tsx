import { createContext, useContext } from "react";

export type RouterContextValue = {
  path: string;
  navigate: (href: string) => void;
};

export const RouterContext = createContext<RouterContextValue | null>(null);

export function useRouter() {
  const value = useContext(RouterContext);
  if (!value) {
    throw new Error("useRouter must be used within RouterProvider");
  }
  return value;
}
