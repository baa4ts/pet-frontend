import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import {
  getMasEjecutadas,
  getMasLentas,
  getMasRows,
  getMasTiempo,
} from "@/actions/dashboard/getAnalitica";
import TablaStats from "@/components/dashboard/TablaStats";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Tab = "mas-lentas" | "mas-ejecutadas" | "mas-tiempo" | "mas-rows";

const fmtMs = (v: number) => `${v.toFixed(1)} ms`;
const fmtNum = (v: number) => v.toLocaleString("es-UY");

const DashQueryAnalitica = () => {
  const [tab, setTab] = useState<Tab>("mas-lentas");

  const masLentas = useQuery({
    queryKey: ["analitica", "mas-lentas"],
    queryFn: getMasLentas,
    enabled: tab === "mas-lentas",
  });

  const masEjecutadas = useQuery({
    queryKey: ["analitica", "mas-ejecutadas"],
    queryFn: getMasEjecutadas,
    enabled: tab === "mas-ejecutadas",
  });

  const masTiempo = useQuery({
    queryKey: ["analitica", "mas-tiempo"],
    queryFn: getMasTiempo,
    enabled: tab === "mas-tiempo",
  });

  const masRows = useQuery({
    queryKey: ["analitica", "mas-rows"],
    queryFn: getMasRows,
    enabled: tab === "mas-rows",
  });

  return (
    <section className="flex flex-1 flex-col overflow-hidden">
      <Separator />
      <article className="min-h-0 flex-1">
        <div className="flex h-full flex-col overflow-y-auto">
          <Tabs
            value={tab}
            onValueChange={(v) => setTab(v as Tab)}
            className="flex flex-1 flex-col"
          >
            <TabsList className="mx-5 mt-4 w-fit">
              <TabsTrigger value="mas-lentas">Mas lentas</TabsTrigger>
              <TabsTrigger value="mas-ejecutadas">Mas ejecutadas</TabsTrigger>
              <TabsTrigger value="mas-tiempo">Mas tiempo total</TabsTrigger>
              <TabsTrigger value="mas-rows">Mas rows</TabsTrigger>
            </TabsList>

            <TabsContent value="mas-lentas" className="flex-1">
              <TablaStats
                data={masLentas.data ?? []}
                isLoading={masLentas.isLoading}
                isError={masLentas.isError}
                refetch={masLentas.refetch}
                columnas={[
                  { key: "calls", label: "Llamadas", format: fmtNum },
                  { key: "mean_exec_time", label: "Media", format: fmtMs },
                ]}
              />
            </TabsContent>

            <TabsContent value="mas-ejecutadas" className="flex-1">
              <TablaStats
                data={masEjecutadas.data ?? []}
                isLoading={masEjecutadas.isLoading}
                isError={masEjecutadas.isError}
                refetch={masEjecutadas.refetch}
                columnas={[{ key: "calls", label: "Llamadas", format: fmtNum }]}
              />
            </TabsContent>

            <TabsContent value="mas-tiempo" className="flex-1">
              <TablaStats
                data={masTiempo.data ?? []}
                isLoading={masTiempo.isLoading}
                isError={masTiempo.isError}
                refetch={masTiempo.refetch}
                columnas={[
                  { key: "calls", label: "Llamadas", format: fmtNum },
                  { key: "total_exec_time", label: "Total", format: fmtMs },
                ]}
              />
            </TabsContent>

            <TabsContent value="mas-rows" className="flex-1">
              <TablaStats
                data={masRows.data ?? []}
                isLoading={masRows.isLoading}
                isError={masRows.isError}
                refetch={masRows.refetch}
                columnas={[
                  { key: "calls", label: "Llamadas", format: fmtNum },
                  { key: "rows", label: "Rows", format: fmtNum },
                ]}
              />
            </TabsContent>
          </Tabs>
        </div>
      </article>
      <Separator />
    </section>
  );
};

export default DashQueryAnalitica;
