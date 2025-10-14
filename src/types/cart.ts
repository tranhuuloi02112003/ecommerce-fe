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
