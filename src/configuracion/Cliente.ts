import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"

const Cliente = createAuthClient({
    
    /**
     * Backend
     */
    baseURL: "http://localhost:3000",

    /**
     * Plugins de better-auth
     */
    plugins: [
        adminClient()
    ],
})

/**
 * Tipo de sesion, con el campo permisos
 */
export type Session = typeof Cliente.$Infer.Session

/**
 * Exportar metodos del cliente
 */
export const { signIn, signUp, useSession } = Cliente