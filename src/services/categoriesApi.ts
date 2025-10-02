import http from "./http";
import type { CategoriesResponse, Category } from "@/types/category";
import { handleApiError } from "@/utils/errorHandler";

export const categoriesApi = {
  getCategories: async (): Promise<CategoriesResponse> => {
    try {
      console.log("🔍 Fetching categories...");

      const response = await http.get<CategoriesResponse>("/api/categories");

      console.log("✅ Categories response:", response.data);
      return response.data;
    } catch (error: unknown) {
      const message = handleApiError(error, "Failed to fetch categories");
      console.error("❌ Categories API error:", message);
      throw new Error(message);
    }
  },

  createCategory: async (name: string): Promise<Category> => {
    try {
      const response = await http.post<Category>("/api/categories", { name });
      return response.data;
    } catch (error: unknown) {
      const message = handleApiError(error, "Failed to create category");
      console.error("❌ Create category API error:", message);
      throw new Error(message);
    }
  },
};
