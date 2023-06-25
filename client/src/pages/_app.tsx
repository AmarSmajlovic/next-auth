import * as React from "react";
import { AppContext, AppProps } from "next/app";
import { getSession, AuthProvider } from "@/auth";

type MyAppProps = {
  session: boolean;
} & AppProps;

export default function MyApp({ Component, session, ...props }: MyAppProps) {
  return (
    <AuthProvider session={session}>
      <Component {...props} />
    </AuthProvider>
  );
}

MyApp.getInitialProps = async (appCtx: AppContext) => {
  const ctx = appCtx.ctx;
  const session = await getSession(ctx);

  return {
    session,
  };
};
