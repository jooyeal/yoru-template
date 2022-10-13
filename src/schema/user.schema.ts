import z from "zod";

export const registUserSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const loginUserSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const getUserEmailSchema = z.object({
  email: z.string()
});

export const editUserSchema = z.object({
  email: z.string(),
  password: z.string(),
});