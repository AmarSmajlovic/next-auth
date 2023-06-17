import { authService } from "@/services/authService";

const useAuth = () => {
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

  return { doLogin };
};

export default useAuth;
