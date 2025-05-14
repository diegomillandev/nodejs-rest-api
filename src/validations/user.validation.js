import z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 characters" })
    .max(30, { message: "Name must be no more than 30 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  gender: z
    .enum(["male", "female", "other"], {
      message: "Gender must be one of: male, female, or other",
    })
    .optional()
    .default("other"),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().nonempty({ message: "Password is required" }),
});
