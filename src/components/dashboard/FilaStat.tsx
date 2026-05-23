import { CaretDown, CaretRight } from "@phosphor-icons/react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Textarea } from "@/components/ui/textarea";

import type { Columna } from "./TablaStats";

const PREVIEW_CHARS = 80;

const FilaStat = ({
  index,
  stat,
  columnas,
}: {
  index: number;
  stat: QueryStat;
  columnas: Columna[];
}) => {
  const preview =
    stat.query.length > PREVIEW_CHARS
      ? stat.query.slice(0, PREVIEW_CHARS).trimEnd() + "…"
      : stat.query;

  return (
    <Collapsible asChild>
      <article className="divide-y divide-border">
        <CollapsibleTrigger className="flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-muted/40 [&[data-state=closed]_.caret-down]:hidden [&[data-state=open]_.caret-right]:hidden">
          <span className="w-6 shrink-0 text-xs text-muted-foreground">{index + 1}</span>

          <span className="min-w-0 flex-1">
            <span className="block font-mono text-xs text-muted-foreground">
              {preview}
            </span>
          </span>

          {columnas.map((col) => {
            const val = stat[col.key];
            const display =
              typeof val === "number"
                ? col.format
                  ? col.format(val)
                  : val.toLocaleString("es-UY")
                : String(val ?? "—");

            return (
              <span
                key={col.key}
                className="w-32 shrink-0 text-right text-xs font-semibold tabular-nums"
              >
                {display}
              </span>
            );
          })}

          <span className="shrink-0 text-muted-foreground">
            <CaretRight className="caret-right h-3.5 w-3.5" />
            <CaretDown className="caret-down h-3.5 w-3.5" />
          </span>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="bg-muted/20 px-5 py-3">
            <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Query completa
            </p>
            <Textarea
              readOnly
              value={stat.query}
              className="min-h-24 resize-y font-mono text-xs"
            />
          </div>
        </CollapsibleContent>
      </article>
    </Collapsible>
  );
};

export default FilaStat;
