import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import { router } from "./Router/Router";

import AOS from "aos";
import "aos/dist/aos.css";
import AuthProvider from "./Context/AuthContext/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// ----------------------------Initialize AOS globally-------------------------
AOS.init();
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="max-w-7xl mx-auto">
          <RouterProvider router={router} />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
