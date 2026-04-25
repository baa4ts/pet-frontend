import { useCallback } from "react";
import { Outlet, useSearchParams } from "react-router";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const LayoutFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const limit = searchParams.get("limit") || "15";
  const full = searchParams.get("full") || "true";
  const order = searchParams.get("order") || "none";

  const onFullChange = useCallback(
    (value: string) => {
      setSearchParams((prev) => {
        prev.delete("page");
        prev.set("full", value);
        return prev;
      });
    },
    [setSearchParams],
  );

  const onLimitChange = useCallback(
    (value: string) => {
      setSearchParams((prev) => {
        prev.delete("page");
        prev.set("limit", value);
        return prev;
      });
    },
    [setSearchParams],
  );

  const onOrderChange = useCallback(
    (value: string) => {
      setSearchParams((prev) => {
        prev.delete("page");
        if (value === "none") {
          prev.delete("order");
        } else {
          prev.set("order", value);
        }
        return prev;
      });
    },
    [setSearchParams],
  );

  return (
    <>
      <section className="w-full h-16 rounded-md py-2 px-5 flex items-center gap-3">
        
        <Label htmlFor="elementos-por-pagina">Elementos por pagina</Label>
        <Select onValueChange={onLimitChange} value={limit}>
          <SelectTrigger id="elementos-por-pagina" className="w-16">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {[1, 2, 3, 4, 5, 10, 15, 20, 25, 30].map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Separator orientation="vertical" />

        <Label htmlFor="elementos-activos">Elementos activos y vencidos</Label>
        <Select onValueChange={onFullChange} value={full}>
          <SelectTrigger id="elementos-activos" className="w-16">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="true">Si</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Separator orientation="vertical" />

        <Label htmlFor="orden-elementos">Orden de los elementos</Label>
        <Select onValueChange={onOrderChange} value={order}>
          <SelectTrigger id="orden-elementos" className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="none">Default</SelectItem>
              <SelectItem value="asc">Ascendente</SelectItem>
              <SelectItem value="desc">Descendente</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
 
      </section>
      <Separator />
      <Outlet />
    </>
  );
};

export default LayoutFilters;
