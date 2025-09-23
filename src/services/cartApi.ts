
import { handleApiError } from "@/utils/errorHandler";
import http from "./http";

export interface CartResponse {
	productId: string;
	productName: string;
	productMainImage: string;
	price: number;
	quantity: number;
}

export interface CartRequest {
	productId: string;
	quantity: number;
}

export const cartApi = {
	getCart: async (): Promise<CartResponse[]> => {
		const res = await http.get<CartResponse[]>("/api/carts");
		return res.data;
	},

	updateCart: async (data: CartRequest): Promise<CartResponse[]> => {
		const res = await http.put<CartResponse[]>("/api/carts", data);
		return res.data;
	},

	removeItem: async (productId: string): Promise<CartResponse[]> => {
		const res = await http.delete<CartResponse[]>(`/api/carts/${productId}`);
		return res.data;
	},
	addToCart: async (productId: string): Promise<CartResponse[]> => {
		try {
		  const response = await http.post<CartResponse[]>(`/api/carts/${productId}`);
		  return response.data;
		} catch (error: unknown) {
		  const message = handleApiError(error, "Failed to add product to cart");
		  console.error("❌ Add to Cart API error:", message);
		  throw new Error(message);
		}
	}
};
