import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { socket } from "./socket";

const queryClient = new QueryClient();

/**
 * Reconeccion: Invalidar todas
 */
socket.on("reconnect", () => queryClient.invalidateQueries());

const TanStack = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {/* Dev Tools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default TanStack;
