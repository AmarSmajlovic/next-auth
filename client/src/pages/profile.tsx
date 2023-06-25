import { useUserDetails } from "@/hooks/useUserDetails";
import React from "react";

export default function Profile() {
  const { userDetails } = useUserDetails();
  return <div>{JSON.stringify(userDetails)}</div>;
}
