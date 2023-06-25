import { userService } from "@/services/userService";
import { UserDetails } from "@/types/user";
import { createContext, useEffect, useState } from "react";

export type AuthContextState = {
  session: boolean;
  userDetails: UserDetails | null;
};

type Props = {
  session: boolean;
  children?: React.ReactNode;
};

export const AuthContext = createContext<AuthContextState | null>(null);

export const AuthProvider = ({ children, session }: Props) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const getDetails = async () => {
      const res = await userService.getUserDetails();
      setUserDetails(res);
    };
    if (session) {
      getDetails();
    }
  }, [session]);
  return (
    <AuthContext.Provider value={{ session, userDetails }}>
      {children}
    </AuthContext.Provider>
  );
};
