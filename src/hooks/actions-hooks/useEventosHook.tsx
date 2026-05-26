import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { getEventosDash } from "@/actions/dashboard/getEventosDash";
import { socket } from "@/configuracion/socket";

export const useEventosHook = () => {
  const [searchParams] = useSearchParams();

  const limit = Number(searchParams.get("limit") ?? 5);
  const order = searchParams.get("order") ?? undefined;
  const page = Number(searchParams.get("page") ?? 1);
  const full = searchParams.get("full") ?? "true";

  const offset = (page - 1) * limit;

  const query = useQuery({
    queryKey: ["eventos", { page, limit, order, full }],
    queryFn: () => getEventosDash({ limit, offset, order, full }),
    staleTime: 10_000,
    refetchInterval: 10_000,
  });

  useEffect(() => {
    socket.on("eventos", () => query.refetch());
    return () => {
      socket.off("eventos");
    };
  }, [query.refetch]);

  return query;
};