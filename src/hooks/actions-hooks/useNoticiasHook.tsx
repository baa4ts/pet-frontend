import { getNoticiasDash } from "@/actions/dashboard/getNoticiasDash"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"

export const useNoticiasHook = () => {
    const [searchParams] = useSearchParams()

    const limit = Number(searchParams.get("limit") ?? 5)
    const order = searchParams.get("order") ?? undefined
    const page  = Number(searchParams.get("page")  ?? 1)
    const full  = searchParams.get("full") ?? "true"

    const offset = (page - 1) * limit

    return useQuery({
        queryKey: ["noticias", { page, limit, order, full }],
        queryFn: () => getNoticiasDash({ limit, offset, order, full }),
        staleTime: 10_000,
        refetchInterval: 10_000,
    })
}