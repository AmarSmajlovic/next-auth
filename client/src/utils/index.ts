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
