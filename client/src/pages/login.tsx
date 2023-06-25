import { GetServerSidePropsContext } from "next";
import cookie from "cookie";
import { generateMaxAgeToken } from "@/utils";
import { useAuth } from "@/auth";

export default function Login() {
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
    res.writeHead(307, { Location: "/profile" });
    res.end();
  }

  return {
    props: {},
  };
}
