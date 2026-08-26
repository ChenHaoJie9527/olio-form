import { useMemo, type ReactNode } from "react";
import { FormUiContext, type FormUiValue } from "@/components/examples/login/form-context";

export function FormUiProvider({
  layout = "vertical",
  disabled = false,
  requiredMark = "after",
  children,
}: FormUiValue & { children: ReactNode }) {
  const value = useMemo(
    () => ({ layout, disabled, requiredMark }),
    [layout, disabled, requiredMark],
  );

  return <FormUiContext value={value}>{children}</FormUiContext>;
}
