import axios from "axios";

class AuthService {
  async login(): Promise<any> {
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          username: "piki",
          password: "123123",
        },
        { withCredentials: true }
      );

      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  async loginGoogle(): Promise<any> {
    try {
      window.open(
        `http://localhost:3000/google`,
        "_self",
        "width=500,height=600"
      );
    } catch (error: any) {
      return error.response.data;
    }
  }
}

export const authService = new AuthService();
