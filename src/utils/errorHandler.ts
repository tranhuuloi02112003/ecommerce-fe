import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    if (error.response?.data) {
      if (
        typeof error.response.data === "object" &&
        "message" in error.response.data
      ) {
        return error.response.data.message;
      }
    }
    if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again.";
};

export const handleApiError = (
  error: unknown,
  defaultMessage?: string
): string => {
  const message = getErrorMessage(error);
  
  if (message === "An unexpected error occurred. Please try again.") {
    return defaultMessage || message;
  }
  return message;
};
