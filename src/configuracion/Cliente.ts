import { createAuthClient } from "better-auth/react"
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins"

const Cliente = createAuthClient({
    
    /**
     * Backend
     */
    baseURL: "http://localhost:3000",

    /**
     * Plugins de better-auth
     */
    plugins: [
        adminClient(),
        inferAdditionalFields({
            user: {
                permisos: {
                    type: "string",
                },
            },
        }),
    ],
})

/**
 * Tipo de sesion, con el campo permisos
 */
export type Session = typeof Cliente.$Infer.Session

export { Cliente }