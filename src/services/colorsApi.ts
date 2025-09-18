import http from "./http";
import type { ColorsResponse, Color } from "@/types/color";

export const colorsApi = {
  getColors: async (): Promise<ColorsResponse> => {
    try {
      const response = await http.get<ColorsResponse>("/api/colors");
      return response.data;
    } catch (error: unknown) {
      console.error("❌ Colors API error:", error);
      throw new Error("Failed to fetch colors");
    }
  },

  createColor: async (name: string): Promise<Color> => {
    try {
      const response = await http.post<Color>("/api/colors", { name });
      return response.data;
    } catch (error: unknown) {
      console.error("❌ Create color API error:", error);
      throw new Error("Failed to create color");
    }
  },
};
