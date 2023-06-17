import useAuth from "@/hooks/useAuth";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import cookie from "cookie";
import { generateMaxAgeToken } from "@/utils";

export default function Login() {
  const router = useRouter();
  const { doLogin, doLoginGoogle } = useAuth();

  return (
    <div>
      <button onClick={doLogin}>login</button>
      <button onClick={doLoginGoogle}>google</button>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { res, query } = context;
  if (query.accessToken && query.refreshToken) {
    const serializedAccessToken = cookie.serialize(
      "access_token",
      query.accessToken as string,
      {
        path: "/",
        maxAge: generateMaxAgeToken(query.accessToken as string),
      }
    );

    const serializedRefreshToken = cookie.serialize(
      "refresh_token",
      query.refreshToken as string,
      {
        path: "/",
        maxAge: generateMaxAgeToken(query.refreshToken as string),
      }
    );

    res.setHeader("Set-Cookie", [
      serializedAccessToken,
      serializedRefreshToken,
    ]);
    res.writeHead(307, { Location: "/test" });
    res.end();
  }

  return {
    props: {},
  };
}
