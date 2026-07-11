import "./utils/sentryInitialize";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";

// biome-ignore lint/style/noNonNullAssertion: rootは必ず存在する
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
