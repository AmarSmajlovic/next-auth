import axios from "axios";

export class AuthService {
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
}

export const authService = new AuthService();
