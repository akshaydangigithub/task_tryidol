import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ContextApi from "./context/contextApi.jsx";
import { HashRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <ContextApi>
        <App />
        <Toaster />
      </ContextApi>
    </HashRouter>
  </StrictMode>
);
