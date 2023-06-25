import { createContext, useState, useEffect } from "react";
import { userService } from "@/services/userService";
import { decodeRefreshToken } from "@/utils";

export type UserContextState = {
  userDetails: any;
  setUserDetails: any;
};

type Props = {
  session?: boolean;
  children?: React.ReactNode;
};

export const UserContext = createContext<UserContextState | null>(null);

export const UserDetailsProvider = ({ children, session }: Props) => {
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    const getDetails = async () => {
      const token = decodeRefreshToken();
      const res = await userService.getUserDetails(token.sub as string);
      setUserDetails(res);
    };
    if (session) {
      getDetails();
    }
  }, []);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};
