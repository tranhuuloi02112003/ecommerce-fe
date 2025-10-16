export interface OrderProduct {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  createdAt: Date;
  totalItems: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
}

export interface OrdersRequest {
  page: number;
  size: number;
  search?: string;
  startDate?: string;
  endDate?: string;
  orderStatus?: string;
  paymentStatus?: string;
  paymentMethod?: string;
}

export interface OrdersResponse {
  data: Order[];
  pagination: {
    page: number;
    size: number;
    totalPages: number;
    totalItems: number;
  };
}
