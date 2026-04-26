import { api } from "@/configuracion/Axios"

interface Params {
    limit?: number
    offset?: number
    order?: string
    full?: boolean
}

export const getNoticiasDash = async (params?: Params): Promise<ServerResponse<Noticia>> => {
    const { data } = await api.get<ServerResponse<Noticia>>("/noticias", { params })
    return data
}