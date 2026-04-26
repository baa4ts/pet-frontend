import { useSearchParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getUsuariosDash } from "@/actions/dashboard/getUsuariosDash";

export const useUsuariosHook = () => {
  const [searchParams] = useSearchParams();

  const limit = Number(searchParams.get("limit") ?? 5);
  const order = searchParams.get("order") ?? undefined;
  const page = Number(searchParams.get("page") ?? 1);
  const full = searchParams.get("full") ?? "true";
  const query = searchParams.get("query") ?? undefined;

  const offset = (page - 1) * limit;

  return useQuery({
    queryKey: ["usuarios", { page, limit, order, full }],
    queryFn: () => getUsuariosDash({ limit, offset, order, full, query }),
    staleTime: 10_000,
    refetchInterval: 10_000,
  });
};
