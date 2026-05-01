// hooks/useEliminar.ts
import { useCallback } from "react";
import { useNavigate } from "react-router";

import { toast } from "sonner";

import { EliminarElemento } from "@/actions/dashboard/EliminarElemento";

interface Props {
  url: string;
  refetch: () => void;
  mensajes: {
    loading: (nombre: string) => string;
    success: (nombre: string) => string;
    error: (nombre: string) => string;
  };
  redireccion?: {
    unauthorized?: string;
    forbidden?: string;
  };
}

export const useEliminar = ({ url, refetch, mensajes, redireccion }: Props) => {
  const navigate = useNavigate();

  const eliminar = useCallback(
    (id: string | number, nombre: string) => {
      toast.promise(
        async () => {
          const check = await EliminarElemento({
            id,
            url,
            onError: (status) => {
              if (status === 401)
                navigate(redireccion?.unauthorized ?? "/autenticacion/login", {
                  replace: true,
                });
              if (status === 403)
                navigate(redireccion?.forbidden ?? "/sin-permisos", { replace: true });
            },
          });
          await refetch();
          return check;
        },
        {
          loading: mensajes.loading(nombre),
          success: mensajes.success(nombre),
          error: mensajes.error(nombre),
          position: "top-center",
        },
      );
    },
    [refetch, navigate, url, redireccion],
  );

  return { eliminar };
};
