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
  const doLoginGoogle = async () => {
    try {
      await authService.loginGoogle();
    } catch (error: any) {
      console.log(error);
    }
  };

  return { doLogin, doLoginGoogle };
};

export default useAuth;
