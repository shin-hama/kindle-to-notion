import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./style.css";
import { Toaster } from "@/components/ui/toaster";
import { CurrentUserProvider } from "@/hooks/use-user.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CurrentUserProvider>
      <App />
    </CurrentUserProvider>
    <Toaster />
  </React.StrictMode>,
);
