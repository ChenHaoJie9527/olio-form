import { useLocale } from "@/site/i18n";
import { tw } from "@/lib/utils";

const cell = tw("border-b border-r border-border px-4 py-2.5 last:border-r-0");
const headCell = tw(
  "border-b border-r border-border bg-muted/50 px-4 py-2.5 font-medium last:border-r-0",
);
const propCell = tw("border-b border-r border-border px-4 py-2.5 font-mono last:border-r-0");

type ApiRow = {
  prop: string;
  description: string;
};

export function ApiTable({ rows }: { rows: ApiRow[] }) {
  const { t } = useLocale();

  return (
    <div className="overflow-x-auto rounded-sm border border-border">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr>
            <th className={headCell}>{t("apiProp")}</th>
            <th className={headCell}>{t("apiDescription")}</th>
          </tr>
        </thead>
        <tbody className="[&>tr:last-child>td]:border-b-0">
          {rows.map((row) => (
            <tr key={row.prop}>
              <td className={propCell}>{row.prop}</td>
              <td className={cell}>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
