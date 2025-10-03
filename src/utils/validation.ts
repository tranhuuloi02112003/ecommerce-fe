import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password must be at least 6 characters")
    .max(50, "Password must not exceed 50 characters"),
});

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(30, "First name must not exceed 30 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(30, "Last name must not exceed 30 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must not exceed 50 characters"),
});

export const profileSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must not exceed 50 characters"),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must not exceed 50 characters"),
    email: z.string(),
    address: z
      .string()
      .min(5, "Address must be at least 5 characters")
      .max(100, "Address must not exceed 100 characters"),
    currentPassword: z.string().optional(),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters")
      .max(50, "New password must not exceed 50 characters")
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.currentPassword && !data.newPassword && !data.confirmPassword) {
        return true;
      }
      if (data.currentPassword) {
        return data.newPassword === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }
  );

export const addProductSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Product name must not exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  quantity: z.number().min(0, "Quantity must be 0 or greater"),
  images: z.array(z.string()).length(4, "Exactly 4 images are required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type AddProductFormData = z.infer<typeof addProductSchema>;
