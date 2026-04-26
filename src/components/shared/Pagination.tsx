import { useCallback } from "react";
import { useSearchParams } from "react-router";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Props {
  total: number;
}

export const Pagination = ({ total }: Props) => {
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
          {total > 0 ? `${page} / ${totalPages}` : "0 / 0"}
        </div>
        <Button onClick={onNext} disabled={page >= totalPages}>
          Siguiente
        </Button>
      </div>
      <Separator orientation="vertical" />
    </article>
  );
};
