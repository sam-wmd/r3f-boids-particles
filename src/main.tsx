import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
const doc = document.getElementById("root");
doc != null &&
  createRoot(doc).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
