import { useEffect } from "react";
import { useSearchParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getRecursosDash } from "@/actions/dashboard/getRecursosDash";
import { socket } from "@/configuracion/socket";

export const useRecursosHook = () => {
  const [searchParams] = useSearchParams();

  const limit = Number(searchParams.get("limit") ?? 20);
  const order = searchParams.get("order") ?? undefined;
  const page = Number(searchParams.get("page") ?? 1);

  const offset = (page - 1) * limit;

  const query = useQuery({
    queryKey: ["recursos", { page, limit, order }],
    queryFn: () => getRecursosDash({ limit, offset, order }),
    staleTime: 10_000,
    refetchInterval: 10_000,
  });

  useEffect(() => {
    socket.on("recursos", () => query.refetch());
    return () => {
      socket.off("recursos");
    };
  }, [query.refetch]);

  return query;
};
