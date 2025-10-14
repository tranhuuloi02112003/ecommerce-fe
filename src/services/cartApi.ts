import { handleApiError } from "@/utils/errorHandler";
import http from "./http";
import type { CartResponse, CartRequest } from "@/types/cart";

export const cartApi = {
  getCart: async (): Promise<CartResponse[]> => {
    try {
      const res = await http.get<CartResponse[]>("/api/carts");
      return res.data;
    } catch (error: unknown) {
      const message = handleApiError(error, "Failed to get cart");
      console.error("❌ Get Cart API error:", message);
      throw new Error(message);
    }
  },

  updateCart: async (data: CartRequest): Promise<CartResponse[]> => {
    try {
      const res = await http.put<CartResponse[]>("/api/carts", data);
      return res.data;
    } catch (error: unknown) {
      const message = handleApiError(error, "Failed to update cart");
      console.error("❌ Update Cart API error:", message);
      throw new Error(message);
    }
  },

  removeItem: async (productId: string): Promise<CartResponse[]> => {
    try {
      const res = await http.delete<CartResponse[]>(`/api/carts/${productId}`);
      return res.data;
    } catch (error: unknown) {
      const message = handleApiError(error, "Failed to remove item from cart");
      console.error("❌ Remove Cart Item API error:", message);
      throw new Error(message);
    }
  },
  addToCart: async (productId: string): Promise<CartResponse[]> => {
    try {
      const response = await http.post<CartResponse[]>(
        `/api/carts/${productId}`
      );
      return response.data;
    } catch (error: unknown) {
      const message = handleApiError(error, "Failed to add product to cart");
      console.error("❌ Add to Cart API error:", message);
      throw new Error(message);
    }
  },
};
