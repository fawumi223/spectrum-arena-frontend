import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import reportWebVitals from "./reportWebVitals";

// 👇 ADD THIS
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

// 👇 ADD THIS
serviceWorkerRegistration.register();

reportWebVitals();
