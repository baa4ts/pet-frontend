import { api } from "@/configuracion/Axios";


export const getEventosTelevision = async (): Promise<Evento[]> => {
    const { data } = await api.get<ServerResponse<Evento>>("/eventos");
    return data.data;
};
