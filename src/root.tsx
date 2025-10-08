import { ReactNode } from "react";
import { Links, Meta, Scripts, ScrollRestoration } from "react-router";
import { App } from "./App.client";

export const Layout = ({ children }: { children: ReactNode }) => (
  <html lang="ja">
    <head>
      <meta charSet="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="images/logo.webp" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        href="fonts/KosugiMaru/KosugiMaru-Regular.woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        href="fonts/NotoSansMono/NotoSansMono-Regular.woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        href="fonts/Inter/Inter-Regular.woff2"
        crossOrigin="anonymous"
      />
      <title>kaniwriter | mruby/c書き込みツール</title>
      <meta
        name="description"
        content="mruby/c 書き込み用ブラウザツール"
      ></meta>
      <style>
        {`
          @font-face {
            font-family: "Kosugi Maru"; font-style: normal; font-weight: 400;
            font-display: swap; src:
            url("fonts/KosugiMaru/KosugiMaru-Regular.woff2") format("woff2");
          }

          @font-face {
            font-family: "Noto Sans Mono"; font-style: normal; font-weight: 400;
            font-display: swap; src:
            url("fonts/NotoSansMono/NotoSansMono-Regular.woff2") format("woff2");
          }
          
          @font-face {
            font-family: "Inter"; font-style: normal; font-weight: 400;
            font-display: swap; src:
            url("fonts/Inter/Inter-Regular.woff2") format("woff2");
          }
        `}
      </style>
      <Meta />
      <Links />
    </head>

    <body>
      {children}
      <ScrollRestoration />
      <Scripts />
    </body>
  </html>
);

const Root = () => <App />;
export default Root;
