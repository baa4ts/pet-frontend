import { useCallback } from "react";
import { useNavigate } from "react-router";

import { Cliente } from "@/configuracion/Cliente";

export const useCerrarSession = () => {
  const navigate = useNavigate();

  return useCallback(() => {
    Cliente.signOut({
      fetchOptions: {
        onSuccess: () => navigate("/autenticacion/login", { replace: true }),
      },
    });
  }, [navigate]);
};
