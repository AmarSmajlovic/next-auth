import React from "react";
import App, { AppContext, AppProps } from "next/app";
import { getSession } from "@/auth";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appCtx: AppContext) => {
  const ctx = appCtx.ctx;
  const session = await getSession(appCtx.ctx.req);
  const publicPages = ["/login"];
  if (session || (!session && publicPages.includes(ctx.pathname))) {
    const props = await App.getInitialProps(appCtx);
    return props;
  }

  if (ctx.res) {
    ctx.res.writeHead(307, {
      Location: `http://localhost:3001/login`,
    });
    return ctx.res.end();
  } else {
    // @ts-ignore
    window.location = `http://localhost:3001/login`;
    await new Promise((resolve) => {});
  }
};

export default MyApp;
