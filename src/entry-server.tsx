import React from "react";
import App from "./App";
import Html from "./Html";
import { InjectionContextProvider } from "./Transport";
export * from "./Transport";
import { StaticRouter } from "react-router-dom/server";

export function render({ isProduction, assets, injectIntoStream, url }) {
  return (
    <InjectionContextProvider value={injectIntoStream}>
      <Html isProduction={isProduction} assets={assets}>
        <React.StrictMode>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </React.StrictMode>
      </Html>
    </InjectionContextProvider>
  );
}
