import type { z } from 'zod';
import type {
  registerUserFormSchema,
  loginUserFormSchema,
  updateUserFormSchema,
} from '../schemas';

export type RegisterUserFormSchema = z.infer<typeof registerUserFormSchema>;
export type LoginUserFormSchema = z.infer<typeof loginUserFormSchema>;
export type UpdateUserFormSchema = z.infer<typeof updateUserFormSchema>;
