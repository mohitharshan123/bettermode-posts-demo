import React from "react";

type HtmlProps = {
  isProduction: boolean;
  assets?: string[];
  children?: React.ReactNode;
};

const Html: React.FC<HtmlProps> = ({ isProduction, assets, children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Bettermode</title>
        {assets?.map((asset: string) => (
          <link
            key={asset}
            rel="stylesheet"
            crossOrigin="anonymous"
            href={asset}
          />
        ))}
      </head>
      <body>
        <div id="root">{children}</div>
        {isProduction ? (
          <></>
        ) : (
          <>
            <script type="module" src="/@vite/client"></script>
            <script type="module" src="/src/entry-client.tsx"></script>

            <script
              type="module"
              async
              dangerouslySetInnerHTML={{
                __html: `
                    import RefreshRuntime from '/@react-refresh';
                    RefreshRuntime.injectIntoGlobalHook(window);
                    window.$RefreshReg$ = () => {};
                    window.$RefreshSig$ = () => (type) => type;
                    window.__vite_plugin_react_preamble_installed__ = true;
                    `
                  .split("\n")
                  .map((s) => s.trim())
                  .join(""),
              }}
            />
          </>
        )}

        <script
          dangerouslySetInnerHTML={{
            __html: `__hydrationProps = ${JSON.stringify({
              assets,
              isProduction,
            })};`,
          }}
        />
      </body>
    </html>
  );
};

export default Html;
