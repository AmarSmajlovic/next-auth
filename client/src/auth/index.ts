import axios from "axios";
import { NextRequest } from "next/server";

export const getSession = (req?: NextRequest): any | null => {
  if (req) {
    try {
      const token = req.cookies.get("refresh_token");
      return token?.value;
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
