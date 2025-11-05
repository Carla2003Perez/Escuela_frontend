//main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {AuthProvider} from "./AuthProvider";
import { ThemeProvider, CssBaseline } from "@mui/material"; // 👈 importa desde MUI
import { theme } from "./theme"; // 👈 importa tu archivo de tema
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>      {/* 👈 aplica el tema global */}
      <CssBaseline />                  {/* 👈 resetea los estilos base */}
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
