import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ToggleProvider from "./context/ToggleContext.tsx";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToggleProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ToggleProvider>
    <ToastContainer position="top-center" />
  </React.StrictMode>
);
