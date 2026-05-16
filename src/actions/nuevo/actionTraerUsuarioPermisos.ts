import { api } from "@/configuracion/Axios";

export const actionGetPermisosUsuario = async (
  id: string,
): Promise<{ permisos: string[]; nombre: string }> => {
  const response = await api.get<ServerResponse<Usuario>>(`/usuarios/${id}`);
  const usuario = response.data.data[0];
  return {
    nombre: usuario.name,
    permisos: usuario.permisos ? usuario.permisos.split(",") : [],
  };
};
