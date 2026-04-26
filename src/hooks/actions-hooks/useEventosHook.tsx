import { getEventosDash } from "@/actions/dashboard/getEventosDash"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"

interface Props {
    full?: boolean
}

export const useEventosHook = ({ full: fullProp = false }: Props) => {
    const [searchParams] = useSearchParams()

    const page  = Number(searchParams.get("page")  ?? "1")
    const limit = Number(searchParams.get("limit") ?? "5")
    const order = searchParams.get("order") ?? "desc"
    const full  = searchParams.has("full")
        ? searchParams.get("full") === "true"
        : fullProp

    const offset = (page - 1) * limit

    return useQuery({
        queryKey: ["eventos", { page, limit, full, order }],
        queryFn:  () => getEventosDash({ limit, offset, full, order }),
        staleTime: 10_000,
        refetchInterval: 10_000,
    })
}