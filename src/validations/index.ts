import { z } from 'zod';

export const registerUserValidate = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  avatarUrl: z.string().optional(),
});

export const updateUserValidate = z.object({
  name: z.string().min(6),
  avatarUrl: z.string().min(6),
  admin: z.boolean(),
});