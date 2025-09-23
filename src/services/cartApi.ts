
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
};
