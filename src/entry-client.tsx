import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Html from "./Html";
import { InjectionContextProvider } from "./Transport";
import { BrowserRouter } from "react-router-dom";

ReactDOM.hydrateRoot(
  document,
  <InjectionContextProvider value={() => {}}>
    <Html {...window.__hydrationProps}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </Html>
  </InjectionContextProvider>
);
