import z from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters" })
    .max(100, { message: "Title must be no more than 100 characters" }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters" })
    .max(5000, { message: "Content must be no more than 5000 characters" }),
  status: z
    .enum(["draft", "published"], {
      errorMap: () => ({
        message: "Status must be either 'draft' or 'published'",
      }),
    })
    .optional(),
});
