import { useCallback, useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { RouterContext, useRouter } from "@/site/router-context";

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((href: string) => {
    if (href === window.location.pathname) return;
    window.history.pushState({}, "", href);
    setPath(href);
  }, []);

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
}

export function Link({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const { navigate } = useRouter();

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    navigate(href);
  };

  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
