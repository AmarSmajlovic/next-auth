import { GetServerSidePropsContext } from "next";
import { decode, JwtPayload } from "jsonwebtoken";
import cookie from "cookie";

export const generateMaxAgeToken = (token: string) => {
  const data = decode(token) as any;
  const expireTime = data.exp;
  const currentTime = Math.floor(Date.now() / 1000);
  const maxAge = expireTime - currentTime;
  return maxAge;
};

export const decodeRefreshToken = () => {
  const cookies = cookie.parse(document.cookie);
  const token = decode(cookies.refresh_token) as JwtPayload;
  return token;
};

export const decodeRefreshTokenSSR = (context: GetServerSidePropsContext) => {
  const cookies = cookie.parse(context.req.headers.cookie || ""); // Parse the cookies from the request headers
  const refreshToken = cookies.access_token || ""; // Get the refresh_token cookie
  const token = decode(refreshToken) as JwtPayload;
  return token;
};
