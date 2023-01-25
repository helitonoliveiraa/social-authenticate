import { z } from 'zod';

export const updateUserValidate = z.object({
  name: z.string().min(6),
  avatarUrl: z.string().min(6),
  admin: z.boolean(),
});