import type { z } from 'zod';
import type { registerUserFormSchema, loginUserFormSchema } from '../schemas';

export type RegisterUserFormSchema = z.infer<typeof registerUserFormSchema>;
export type LoginUserFormSchema = z.infer<typeof loginUserFormSchema>;
