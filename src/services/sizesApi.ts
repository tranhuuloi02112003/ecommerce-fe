import http from "./http";
import type { Size } from "@/types/size";

export const sizesApi = {
  getSizes: async (): Promise<Size[]> => {
    const response = await http.get<Size[]>("/api/sizes");
    return response.data;
  },

  createSize: async (name: string): Promise<Size> => {
    const response = await http.post<Size>("/api/sizes", { name });
    return response.data;
  },
};
