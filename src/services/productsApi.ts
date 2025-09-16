import http from "./http";
import type { ProductsRequest, ProductsResponse } from "@/types/product";

export const productsApi = {
  getProducts: async (params: ProductsRequest): Promise<ProductsResponse> => {
    try {
      const response = await http.get<ProductsResponse>(
        `/api/products?page=${params.page}&size=${params.size}`
      );
      return response.data;
    } catch (error: unknown) {
      console.error("❌ Products API error:", error);

      throw new Error("Failed to fetch products");
    }
  },
};
