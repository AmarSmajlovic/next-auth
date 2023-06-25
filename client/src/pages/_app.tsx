import * as React from "react";
import { AppContext, AppProps } from "next/app";
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
  const session = await getSession(ctx);

  return {
    session,
  };
};
