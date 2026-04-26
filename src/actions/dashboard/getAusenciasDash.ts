import { api } from "@/configuracion/Axios"

interface Params {
    limit?: number
    offset?: number
    order?: string
    full?: boolean
}

export const getAusenciasDash = async (params?: Params): Promise<ServerResponse<Ausencia>> => {
    const { data } = await api.get<ServerResponse<Ausencia>>("/ausencias", { params })
    return data
}