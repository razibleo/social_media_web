import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes/mainroutes";
import { AuthProvider } from "./providers/authprovider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
      {/* <App /> */}
    </AuthProvider>
  </React.StrictMode>
);
