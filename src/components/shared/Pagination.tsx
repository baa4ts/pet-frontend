import { useCallback } from "react";
import { useSearchParams } from "react-router";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Input } from "../ui/input";

interface Props {
  total: number;
  busqueda: boolean;
  placeholder?: string;
}

export const Pagination = ({ total, busqueda = false, placeholder }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") || "1");
  const limit = searchParams.get("limit") || "5";
  const totalPages = Math.ceil(total / Number(limit));

  const onPrev = useCallback(() => {
    if (page <= 1) return;
    setSearchParams((prev) => {
      prev.set("page", String(page - 1));
      return prev;
    });
  }, [page, setSearchParams]);

  const onNext = useCallback(() => {
    if (page >= totalPages) return;
    setSearchParams((prev) => {
      prev.set("page", String(page + 1));
      return prev;
    });
  }, [page, totalPages, setSearchParams]);

  const onQueryChange = useCallback(
    (value: string) => {
      setSearchParams((prev) => {
        prev.delete("page");
        if (value.length <= 0) {
          prev.delete("query");
        } else {
          prev.set("query", value);
        }
        return prev;
      });
    },
    [setSearchParams],
  );

  return (
    <article className="flex h-12 flex-row items-center">
      <div className="flex h-full items-center mx-4">
        Total de elementos {` ${total}`}
      </div>
      <Separator orientation="vertical" />
      <div className="flex h-full items-center gap-2 mx-4">
        <Button onClick={onPrev} disabled={page <= 1}>
          Anterior
        </Button>
        <div className="w-16 flex items-center justify-center">
          {total > 0 ? `${page} / ${totalPages}` : "-- / --"}
        </div>
        <Button onClick={onNext} disabled={page >= totalPages}>
          Siguiente
        </Button>
      </div>

      {/* Seccion de busqueda */}
      {busqueda && (
        <>
          <Separator orientation="vertical" />
          <div className="w-80 mx-4">
            <Input
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder={placeholder || " . . . "}
            />
          </div>
        </>
      )}
    </article>
  );
};
