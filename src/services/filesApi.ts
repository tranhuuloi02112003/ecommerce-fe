import http from "./http";
import { handleApiError } from "@/utils/errorHandler";

export const filesApi = {
  uploadFiles: async (files: File[]): Promise<{ key: string; url: string }[]> => {
    try {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await http.post<{ key: string; url: string }[]>("/api/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error: unknown) {
      const message = handleApiError(error, "Failed to upload files");
      console.error("❌ Upload Files API error:", message);
      throw new Error(message);
    }
  },
};
