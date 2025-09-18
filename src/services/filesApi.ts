import http from "./http";

export const filesApi = {
  uploadFiles: async (files: File[]): Promise<string[]> => {
    const formData = new FormData();
    
    files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await http.post<string[]>("/api/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
};