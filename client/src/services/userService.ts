import { decodeRefreshToken } from "@/utils";
import axios from "axios";

class UserService {
  async getUserDetails() {
    try {
      const token = decodeRefreshToken(); // in order to get sub (id of user)
      const res = await axios.get(`http://localhost:3000/users/${token.sub}`);

      return res.data;
    } catch (error: any) {
      return null;
    }
  }
}

export const userService = new UserService();
