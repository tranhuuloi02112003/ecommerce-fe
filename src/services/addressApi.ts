import type { Address, AddressRequest } from "@/types/address";
import http from "./http";
import { handleApiError } from "@/utils/errorHandler";

const BASE_URL = "/api/addresses";

export const addressApi = {
  getAddresses: async (): Promise<Address[]> => {
    try {
      const response = await http.get<Address[]>(BASE_URL);
      return response.data;
    } catch (error) {
      const message = handleApiError(error, "Failed to get addresses");
      console.error("❌ Get addresses API error:", message);
      throw new Error(message);
    }
  },

  createAddress: async (address: AddressRequest): Promise<void> => {
    try {
      await http.post<void>(BASE_URL, address);
    } catch (error) {
      const message = handleApiError(error, "Failed to create address");
      console.error("❌ Create address API error:", message);
      throw new Error(message);
    }
  },

  updateAddress: async (id: string, address: AddressRequest): Promise<void> => {
    try {
      await http.put(`${BASE_URL}/${id}`, address);
    } catch (error) {
      const message = handleApiError(error, "Failed to update address");
      console.error("❌ Update address API error:", message);
      throw new Error(message);
    }
  },

  deleteAddress: async (id: string): Promise<void> => {
    try {
      await http.delete(`${BASE_URL}/${id}`);
    } catch (error) {
      const message = handleApiError(error, "Failed to delete address");
      console.error("❌ Delete address API error:", message);
      throw new Error(message);
    }
  },

  setDefaultAddress: async (id: string): Promise<void> => {
    try {
      await http.put(`${BASE_URL}/${id}/default`);
    } catch (error) {
      const message = handleApiError(error, "Failed to set default address");
      console.error("❌ Set default address API error:", message);
      throw new Error(message);
    }
  },
};
