// actionGetUsuario.ts
import { api } from "@/configuracion/Axios";

export const actionGetUsuario = async (id: string): Promise<Usuario> => {
  const response = await api.get<ServerResponse<Usuario>>(`/usuarios/${id}`);
  return response.data.data[0];
};
