import { z } from "zod";

const userIdParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID harus berupa angka")
});

export const createUserSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter")
});

export const getUserByIdSchema = {
  params: userIdParamsSchema
};

export const updateUserSchema = {
  params: userIdParamsSchema,
  body: z.object({
    name: z.string().min(3, "Nama minimal 3 karakter"),
    email: z.string().email("Email tidak valid")
  })
};

export const deleteUserSchema = {
  params: userIdParamsSchema
};

