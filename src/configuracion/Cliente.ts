import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { BACKEND_API } from "./CONF";

const Cliente = createAuthClient({
  /**
   * Backend
   */
  baseURL: BACKEND_API,
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
