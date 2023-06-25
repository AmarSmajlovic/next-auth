import { authService } from "@/services/authService";
import { useContext } from "react";
import { AuthContext, AuthContextState } from "./authContext";
import axios from "axios";
import cookie from "cookie";
import { NextPageContext } from "next";

export const useAuth = () => {
  const { session, userDetails } = useContext(AuthContext) as AuthContextState;
  const doLogin = async () => {
    try {
      const data = await authService.login();
      if (data.user) {
        // @ts-ignore
        window.location = `/test`;
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  const doLoginGoogle = async () => {
    try {
      await authService.loginGoogle();
    } catch (error: any) {
      console.log(error);
    }
  };

  return { session, userDetails, doLogin, doLoginGoogle };
};

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
