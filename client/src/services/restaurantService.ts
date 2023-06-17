import { api } from "./Client";

class Service {
  async getResturants(): Promise<any> {
    try {
      const res = await api.get("/restaurants");
      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
}

export const restaurantService = new Service();
