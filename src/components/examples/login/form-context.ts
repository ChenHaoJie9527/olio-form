import { createContext, useContext } from "react";

export type FormLayout = "vertical" | "horizontal" | "inline";
export type RequiredMark = "before" | "after";

export type FormUiValue = {
  layout: FormLayout;
  disabled: boolean;
  requiredMark: RequiredMark;
};

export const FormUiContext = createContext<FormUiValue>({
  layout: "vertical",
  disabled: false,
  requiredMark: "after",
});

export function useFormUi() {
  return useContext(FormUiContext);
}
