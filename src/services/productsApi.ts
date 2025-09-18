import http from "./http";
import type { ProductsRequest, ProductsResponse, CreateProductRequest, CreateProductResponse } from "@/types/product";

export const productsApi = {
  getProducts: async (params: ProductsRequest): Promise<ProductsResponse> => {
    try {
      const queryParams = new URLSearchParams({
        page: params.page.toString(),
        size: params.size.toString(),
        search: params.search?.trim() || "",
      });

      const response = await http.get<ProductsResponse>(
        `/api/products?${queryParams.toString()}`
      );
      return response.data;
    } catch (error: unknown) {
      console.error("❌ Products API error:", error);

      throw new Error("Failed to fetch products");
    }
  },

  createProduct: async (productData: CreateProductRequest): Promise<CreateProductResponse> => {
    try {
      const response = await http.post<CreateProductResponse>("/api/products", productData);
      return response.data;
    } catch (error: unknown) {
      console.error("❌ Create Product API error:", error);
      throw new Error("Failed to create product");
    }
  },
};
