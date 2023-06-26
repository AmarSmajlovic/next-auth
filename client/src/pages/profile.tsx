import { useAuth } from "@/auth";
import React from "react";

export default function Profile() {
  const { userDetails, doLogout } = useAuth();
  return (
    <div>
      {JSON.stringify(userDetails)} <button onClick={doLogout}>logout</button>
    </div>
  );
}
