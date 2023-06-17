import { decode } from "jsonwebtoken";

export const generateMaxAgeToken = (token: string) => {
  const data = decode(token) as any;
  const expireTime = data.exp;
  const currentTime = Math.floor(Date.now() / 1000);
  const maxAge = expireTime - currentTime;
  return maxAge;
};
