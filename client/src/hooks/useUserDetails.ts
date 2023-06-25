import { UserContext, UserContextState } from "@/contexts";
import { useContext } from "react";

export const useUserDetails = () => useContext(UserContext) as UserContextState;
