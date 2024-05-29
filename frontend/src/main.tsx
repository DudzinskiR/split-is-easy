import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import { Provider } from "react-redux";
import { setupStore } from "./features/store.ts";
import { BrowserRouter } from "react-router-dom";
import { GlobalFlagContextProvider } from "./contexts/global-flag/global-flag.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <BrowserRouter>
        <GlobalFlagContextProvider>
          <App />
        </GlobalFlagContextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
