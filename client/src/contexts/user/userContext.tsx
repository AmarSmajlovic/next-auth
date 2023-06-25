import { createContext, useState, useEffect } from "react";
import { userService } from "@/services/userService";
import { UserDetails } from "@/types/user";

export type UserContextState = {
  userDetails: UserDetails | null;
};

type Props = {
  session?: boolean;
  children?: React.ReactNode;
};

export const UserContext = createContext<UserContextState | null>(null);

export const UserDetailsProvider = ({ children, session }: Props) => {
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
    <UserContext.Provider value={{ userDetails }}>
      {children}
    </UserContext.Provider>
  );
};
