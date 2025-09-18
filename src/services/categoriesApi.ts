import http from "./http";
import type { CategoriesResponse, Category } from "@/types/category";

export const categoriesApi = {
  getCategories: async (): Promise<CategoriesResponse> => {
    try {
      console.log('🔍 Fetching categories...');
      
      const response = await http.get<CategoriesResponse>('/api/categories');
      
      console.log('✅ Categories response:', response.data);
      return response.data;
    } catch (error: unknown) {
      console.error('❌ Categories API error:', error);
      throw new Error('Failed to fetch categories');
    }
  },

  createCategory: async (name: string): Promise<Category> => {
    try {
      const response = await http.post<Category>('/api/categories', { name });
      return response.data;
    } catch (error: unknown) {
      console.error('❌ Create category API error:', error);
      throw new Error('Failed to create category');
    }
  }
};