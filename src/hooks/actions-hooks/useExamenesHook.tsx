import { useEffect } from "react";
import { useSearchParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getExamenesDash } from "@/actions/dashboard/getExamenesDash";
import { socket } from "@/configuracion/socket";

export const useExamenesHook = () => {
  const [searchParams] = useSearchParams();

  const limit = Number(searchParams.get("limit") ?? 5);
  const order = searchParams.get("order") ?? undefined;
  const page = Number(searchParams.get("page") ?? 1);
  const full = searchParams.get("full") ?? "true";

  const offset = (page - 1) * limit;

  const query = useQuery({
    queryKey: ["examenes", { page, limit, order, full }],
    queryFn: () => getExamenesDash({ limit, offset, order, full }),
    staleTime: 10_000,
    refetchInterval: 10_000,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    socket.on("examenes", () => query.refetch());
    return () => {
      socket.off("examenes");
    };
  }, [query.refetch]);

  return query;
};
