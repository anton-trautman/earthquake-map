import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Telegram Mini App SDK
import WebApp from "@twa-dev/sdk";
import "./styles.css";

if (WebApp.version) {
  // Initialize the Telegram Mini App SDK
  WebApp.ready();
  // // Expand the Telegram Mini App to full screen
  WebApp.expand();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
