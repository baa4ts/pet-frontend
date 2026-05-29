import { useEffect } from "react";
import { useSearchParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getNoticiasDash } from "@/actions/dashboard/getNoticiasDash";
import { socket } from "@/configuracion/socket";

export const useNoticiasHook = () => {
  const [searchParams] = useSearchParams();

  const limit = Number(searchParams.get("limit") ?? 5);
  const order = searchParams.get("order") ?? undefined;
  const page = Number(searchParams.get("page") ?? 1);
  const full = searchParams.get("full") ?? "true";

  const offset = (page - 1) * limit;

  const query = useQuery({
    queryKey: ["noticias", { page, limit, order, full }],
    queryFn: () => getNoticiasDash({ limit, offset, order, full }),
    staleTime: 10_000,
    refetchInterval: 10_000,
  });

  useEffect(() => {
    socket.on("noticias", () => query.refetch());
    return () => {
      socket.off("noticias");
    };
  }, [query.refetch]);

  return query;
};
