import { api } from "@/configuracion/Axios";

export const actionNuevoRecurso = async (archivo: File): Promise<boolean> => {
  try {
    const formData = new FormData();
    formData.append("archivo", archivo);
    await api.post("/recursos", formData);
    return true;
  } catch {
    return false;
  }
};