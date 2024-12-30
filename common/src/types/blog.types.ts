import { z } from "zod";

export const createBlogInput = z.object({
  title: z.string(),
  content: z.string().min(100),
  published: z.boolean(),
});

export const updateBlogInput = z.object({
  title: z.string().optional(),
  content: z.string().min(100).optional(),
  published: z.boolean().optional(),
});

export type CreateBlogInput = z.infer<typeof createBlogInput>;

export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
