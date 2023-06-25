import axios from "axios";
import cookie from "cookie";
import { NextPageContext } from "next";

export const getSession = (ctx?: NextPageContext): any | null => {
  if (ctx?.req) {
    try {
      const parsedCookies = cookie.parse(ctx.req.headers.cookie as string);
      const refreshToken = parsedCookies.refresh_token;
      return refreshToken;
    } catch (e) {
      return null;
    }
  }
  return null;
};

export const refreshSession = async () => {
  try {
    const {
      data: { accessToken },
    } = await axios.post(
      "http://localhost:3000/refresh",
      {},
      { withCredentials: true }
    );

    return accessToken;
  } catch (error) {
    console.error("Error refreshing session:", error);
  }

  return null;
};
