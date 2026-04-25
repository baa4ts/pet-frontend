import { Cliente } from "@/configuracion/Cliente";
import { useCallback } from "react";
import { useNavigate } from "react-router";

export const CerrarSession = useCallback(() => {
    const navigate = useNavigate()

    Cliente.signOut({
        fetchOptions: {
            onSuccess: () => navigate({ pathname: "/autenticacion/login" }, { replace: true })
        }
    })
}, [])