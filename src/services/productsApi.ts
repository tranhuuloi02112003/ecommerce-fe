import { handleApiError } from "@/utils/errorHandler";
import http from "./http";
import type {
  ProductsRequest,
  ProductsResponse,
  CreateProductRequest,
  CreateProductResponse,
  ProductHomeResponse,
} from "@/types/product";

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
      const message = handleApiError(error, "Failed to fetch products");
      console.error("❌ Products API error:", message);
      throw new Error(message);
    }
  },
  
  getProductsByCategory: async (
    categoryId: string,
    page = 1,
    size = 8
  ): Promise<ProductsResponse> => {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });

      const response = await http.get<ProductsResponse>(
        `/api/products/category/${categoryId}?${queryParams.toString()}`
      );
      return response.data;
    } catch (error: unknown) {
      const message = handleApiError(error, "Failed to fetch products by category");
      console.error("❌ Products by Category API error:", message);
      throw new Error(message);
    }
  },

  createProduct: async (
    productData: CreateProductRequest
  ): Promise<CreateProductResponse> => {
    try {
      const response = await http.post<CreateProductResponse>(
        "/api/products",
        productData
      );
      return response.data;
    } catch (error: unknown) {
      const message = handleApiError(error, "Failed to create product");
      console.error("❌ Create Product API error:", message);
      throw new Error(message);
    }
  },

  getProductById: async (id: string): Promise<CreateProductResponse> => {
    try {
      const response = await http.get<CreateProductResponse>(
        `/api/products/${id}`
      );
      return response.data;
    } catch (error: unknown) {
      const message = handleApiError(error, "Failed to fetch product");
      console.error("❌ Get Product API error:", message);
      throw new Error(message);
    }
  },

  updateProduct: async (
    id: string,
    productData: CreateProductRequest
  ): Promise<CreateProductResponse> => {
    try {
      const response = await http.put<CreateProductResponse>(
        `/api/products/${id}`,
        productData
      );
      return response.data;
    } catch (error: unknown) {
      const message = handleApiError(error, "Failed to update product");
      console.error("❌ Update Product API error:", message);
      throw new Error(message);
    }
  },

  getExploreProducts: async (): Promise<ProductHomeResponse[]> => {
    try {
      const response = await http.get<ProductHomeResponse[]>(
        `/api/products/explore`
      );
      return response.data;
    } catch (error: unknown) {
      const message = handleApiError(error, "Failed to fetch products");
      console.error("❌ Explore Products API error:", message);
      throw new Error(message);
    }
  },

  getProductDetail: async (
    id: string
  ): Promise<{
    id: string;
    name: string;
    description: string;
    price: number;
    images: { key: string; url: string }[];
  }> => {
    try {
      const response = await http.get(`/api/products/${id}`);
      return response.data;
    } catch (error: unknown) {
      const message = handleApiError(error, "Failed to fetch product detail");
      console.error("❌ Product Detail API error:", message);
      throw new Error(message);
    }
  },
};
