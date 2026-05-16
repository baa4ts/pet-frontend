// actionActualizarPermisosUsuario.ts
import { api } from "@/configuracion/Axios";

export const actionActualizarPermisosUsuario = async (
  id: string,
  permisos: string[],
): Promise<boolean> => {
  try {
    await api.patch(`/permisos/usuario/${id}`, { permisos });
    return true;
  } catch {
    return false;
  }
};
