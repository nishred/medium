import { z } from "zod";

export const signUpInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
});

export const signInInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignUpInput = z.infer<typeof signUpInput>;

export type SignInInput = z.infer<typeof signInInput>;
