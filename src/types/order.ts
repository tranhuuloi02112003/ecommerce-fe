export interface OrderProduct {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  date: Date;
  status: "pending" | "delivered" | "processing" | "canceled";
  total: number;
  products: OrderProduct[];
  address: string;
}

export interface OrdersRequest {
  page: number;
  size: number;
  search?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
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
