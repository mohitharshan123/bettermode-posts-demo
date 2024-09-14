import express from "express";
import { renderToReadableStream } from "react-dom/server.edge";
import { readFile } from "node:fs/promises";
import {
  createInjectionTransformStream,
  pipeReaderToResponse,
} from "@apollo/client-react-streaming/stream-utils";
import cookieParser from "cookie-parser";

import { redirectMiddleware } from "./redirectMiddleware.js";

// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

// Create http server
const app = express();

app.use(cookieParser());

// Add Vite or respective production middlewares
let vite;
let bootstrapModules = [];
let assets = [];
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true, hmr: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression());
  app.use(base, sirv("./dist/client", { extensions: [] }));
  const index = await readFile("./dist/client/index.html", "utf-8");
  for (const script of index.matchAll(
    /<script type="module" \w+ src="(.*)">/g
  )) {
    bootstrapModules.push(script[1]);
  }
  for (const link of index.matchAll(
    /<link rel="stylesheet" \w+ href="(.*)">/g
  )) {
    assets.push(link[1]);
  }
}

app.use(redirectMiddleware);

app.use("*", async (req, res) => {
  res.socket.on("error", (error) => {
    console.error("Fatal", error);
  });

  const { render } = /** @type {import('./src/entry-server.jsx.js')}*/ (
    await (isProduction
      ? import("./dist/server/entry-server.js")
      : vite.ssrLoadModule("/src/entry-server.tsx"))
  );

  const { injectIntoStream, transformStream } =
    createInjectionTransformStream();

  const App = render({
    isProduction,
    assets,
    injectIntoStream,
    url: req.originalUrl,
  });

  const reactStream =
    /** @type {ReadableStream & {allReady: Promise<void>}}  */ (
      await renderToReadableStream(App, {
        bootstrapModules,
      })
    );

  await pipeReaderToResponse(
    reactStream.pipeThrough(transformStream).getReader(),
    res
  );
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
