import { handleApiError } from "@/utils/errorHandler";
import http from "./http";
import type { OrdersRequest, OrdersResponse } from "@/types/order";
import { mockOrders } from "@/mock/orders";

export const ordersApi = {
  getOrders: async (params: OrdersRequest): Promise<OrdersResponse> => {
    try {
      const queryParams = new URLSearchParams({
        page: params.page.toString(),
        size: params.size.toString(),
        search: params.search?.trim() || "",
        orderStatus: params.orderStatus || "",
        paymentStatus: params.paymentStatus || "",
        endDate: params.endDate ? params.endDate : "",
        startDate: params.startDate ? params.startDate : "",
      });
      const response = await http.get<OrdersResponse>(
        `/api/orders?${queryParams.toString()}`
      );
      return response.data;
    } catch (error: unknown) {
      const message = handleApiError(error, "Failed to fetch orders");
      console.error("❌ Orders API error:", message);
      throw new Error(message);
    }
  },

  getOrderById: async (orderId: string) => {
    try {
      // const response = await http.get<Order>(`/api/orders/${orderId}`);
      // return response.data;

      const order = mockOrders.find((o) => o.id === orderId);
      if (!order) {
        throw new Error("Order not found");
      }
      return order;
    } catch (error: unknown) {
      const message = handleApiError(error, "Failed to fetch order");
      console.error("❌ Order API error:", message);
      throw new Error(message);
    }
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    try {
      // const response = await http.patch(`/api/orders/${orderId}`, { status });
      // return response.data;

      const orderIndex = mockOrders.findIndex((o) => o.id === orderId);
      if (orderIndex === -1) {
        throw new Error("Order not found");
      }

      mockOrders[orderIndex] = {
        ...mockOrders[orderIndex],
        status: status as any,
      };

      return mockOrders[orderIndex];
    } catch (error: unknown) {
      const message = handleApiError(error, "Failed to update order status");
      console.error("❌ Update Order Status API error:", message);
      throw new Error(message);
    }
  },
};
