import { useEffect } from "react";
import { useSearchParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getAusenciasDash } from "@/actions/dashboard/getAusenciasDash";
import { socket } from "@/configuracion/socket";

export const useAusenciasHook = () => {
  const [searchParams] = useSearchParams();

  const limit = Number(searchParams.get("limit") ?? 5);
  const order = searchParams.get("order") ?? undefined;
  const page = Number(searchParams.get("page") ?? 1);
  const full = searchParams.get("full") ?? "true";

  const offset = (page - 1) * limit;

  const query = useQuery({
    queryKey: ["ausencias", { page, limit, order, full }],
    queryFn: () => getAusenciasDash({ limit, offset, order, full }),
    staleTime: 10_000,
    refetchInterval: 10_000,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    socket.on("ausencias", () => query.refetch());
    return () => {
      socket.off("ausencias");
    };
  }, [query.refetch]);

  return query;
};
