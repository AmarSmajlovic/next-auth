import { NextApiRequest, NextApiResponse } from "next";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Remove refresh_token and access_token cookies
  res.setHeader("Set-Cookie", [
    "refresh_token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
    "access_token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
  ]);
  res.status(200).json({ message: "Logged out successfully" });
}
