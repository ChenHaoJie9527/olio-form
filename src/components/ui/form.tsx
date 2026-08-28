import { useMemo, type ReactNode } from "react";
import { createContext, useContext } from "react";
import { Form as FormischForm, type FormProps, type FormSchema } from "@formisch/react";

export type FormLayout = "vertical" | "horizontal" | "inline";
export type RequiredMark = "before" | "after" | false;

export type FormUiValue = {
  layout: FormLayout;
  disabled: boolean;
  requiredMark: RequiredMark;
};

const FormUiContext = createContext<FormUiValue>({
  layout: "vertical",
  disabled: false,
  requiredMark: "after",
});

export function useFormUi() {
  return useContext(FormUiContext);
}

export type OlioFormProps<TSchema extends FormSchema = FormSchema> = FormProps<TSchema> & {
  layout?: FormLayout;
  disabled?: boolean;
  requiredMark?: RequiredMark;
  children?: ReactNode;
};

export function Form<TSchema extends FormSchema>({
  of,
  onSubmit,
  layout = "vertical",
  disabled = false,
  requiredMark = "after",
  className,
  children,
  ...props
}: OlioFormProps<TSchema>) {
  const value = useMemo(
    () => ({ layout, disabled, requiredMark }),
    [layout, disabled, requiredMark],
  );

  return (
    <FormUiContext value={value}>
      <FormischForm of={of} onSubmit={onSubmit} className={className} {...props}>
        <fieldset disabled={disabled} className="m-0 min-w-0 border-0 p-0">
          {children}
        </fieldset>
      </FormischForm>
    </FormUiContext>
  );
}
