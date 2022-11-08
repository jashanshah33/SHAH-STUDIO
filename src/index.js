import React from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App";
import { AuthProvider } from "./providers/authProvider";

const root = createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
