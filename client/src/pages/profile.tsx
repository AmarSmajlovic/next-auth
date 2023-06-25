import { useAuth } from "@/auth";
import React from "react";

export default function Profile() {
  const { userDetails } = useAuth();
  return <div>{JSON.stringify(userDetails)}</div>;
}
