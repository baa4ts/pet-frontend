import { useSearchParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getRecursosDash } from "@/actions/dashboard/getRecursosDash";

export const useRecursosHook = () => {
  const [searchParams] = useSearchParams();

  const limit = Number(searchParams.get("limit") ?? 20);
  const order = searchParams.get("order") ?? undefined;
  const page = Number(searchParams.get("page") ?? 1);

  const offset = (page - 1) * limit;

  return useQuery({
    queryKey: ["recursos", { page, limit, order }],
    queryFn: () => getRecursosDash({ limit, offset, order }),
    staleTime: 10_000,
    refetchInterval: 10_000,
  });
};
