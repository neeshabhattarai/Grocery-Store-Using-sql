import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { User } from "./assets/Authentication.tsx";

createRoot(document.getElementById("root")!).render(
  <User>
    <App />
  </User>
);
