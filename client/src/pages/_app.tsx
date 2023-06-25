import * as React from "react";
import App, { AppContext, AppProps } from "next/app";
import { UserDetailsProvider } from "@/contexts";
import { getSession } from "@/auth";

type MyAppProps = {
  session: boolean;
} & AppProps;

export default function MyApp({ Component, session, ...props }: MyAppProps) {
  return (
    <UserDetailsProvider session={session}>
      <Component {...props} />
    </UserDetailsProvider>
  );
}

MyApp.getInitialProps = async (appCtx: AppContext) => {
  const ctx = appCtx.ctx;
  const publicPages = ["/login"];
  const session = await getSession(ctx);

  if (session || (!session && publicPages.includes(ctx.pathname))) {
    const props = await App.getInitialProps(appCtx);
    return {
      ...props,
      session,
    };
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
