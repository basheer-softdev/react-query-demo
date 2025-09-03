import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";

const client = new QueryClient(); // Central manager for all queries

// It stores:
//    1. Query cache (all fetched data)
//    2. Query states (isLoading, isError, data)
//    3. Default configurations for queries (like staleTime, cacheTime, etc.)

createRoot(document.getElementById("root")).render(
  // React context provider
  <QueryClientProvider client={client}>
    <App /> {/* All useQuery/useMutation can access client */}
    <ReactQueryDevtools /> {/* Optional dev tool */}
  </QueryClientProvider>
);
