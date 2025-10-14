import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import { router } from "./Router/Router";

import AOS from "aos";
import "aos/dist/aos.css";
// ✅ Initialize AOS globally
AOS.init({
  duration: 4000, // animation duration in ms
  once: true, // animation runs only once
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="max-w-7xl mx-auto">
      <RouterProvider router={router} />
    </div>
  </StrictMode>
);
