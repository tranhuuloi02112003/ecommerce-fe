
import { handleApiError } from "@/utils/errorHandler";
import http from "./http";
import type { ProductHomeResponse } from "@/types/product";

export const wishApi = {
  getUserWishlist: async (): Promise<ProductHomeResponse[]> => {
    try {
      const res = await http.get<ProductHomeResponse[]>("/api/products/wishlist");
      return res.data;
    } catch (error: unknown) {
      const message = handleApiError(
        error,
        "Failed to fetch wishlist"
      );
      console.error("❌ Get Wishlist API error:", message);
      throw new Error(message);
    }
  },
  removeWish: async (productId: string): Promise<void> => {
    try {
      await http.delete<void>(`/api/products/${productId}/wishlist`);
    } catch (error: unknown) {
      const message = handleApiError(
        error,
        "Failed to delete product from wishlist"
      );
      console.error("❌ Delete Wishlist API error:", message);
      throw new Error(message);
    }
  },
  addWish: async (productId: string): Promise<void> => {
    try {
      await http.post<void>(`/api/products/${productId}/wishlist`);
    } catch (error: unknown) {
      const message = handleApiError(
        error,
        "Failed to add product to wishlist"
      );
      console.error("❌ Add to Wishlist API error:", message);
      throw new Error(message);
    }
  },
};
