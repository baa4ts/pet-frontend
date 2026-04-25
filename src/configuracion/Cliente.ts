import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const Cliente = createAuthClient({
  /**
   * Backend
   */
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  /**
   * Plugins de better-auth
   */
  plugins: [
    adminClient(),
    inferAdditionalFields({
      user: {
        permisos: {
          type: "string",
          required: false,
        },
      },
    }),
  ],
});

/**
 * Tipo de sesion, con el campo permisos
 */
export type Session = typeof Cliente.$Infer.Session;

export { Cliente };
