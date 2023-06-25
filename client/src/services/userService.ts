import axios from "axios";

class UserService {
  async getUserDetails(id: string) {
    try {
      const res = await axios.get(`http://localhost:3000/users/${id}`);

      return res.data;
    } catch (error: any) {
      return null;
    }
  }
}

export const userService = new UserService();
