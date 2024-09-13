import React, { ReactNode } from "react";
import App from "./App";
import Html from "./Html";
import { InjectionContextProvider } from "./Transport";
import { StaticRouter } from "react-router-dom/server";

export * from "./Transport";

type RenderParams = {
  isProduction: boolean;
  assets: string[];
  injectIntoStream: (callback: () => ReactNode) => void;
  url: string;
};

export function render({
  isProduction,
  assets,
  injectIntoStream,
  url,
}: RenderParams) {
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
