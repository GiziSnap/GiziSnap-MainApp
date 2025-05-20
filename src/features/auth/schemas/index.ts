import { z } from 'zod';

export const registerUserFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username minimal 3 karakter' })
    .max(20, { message: 'Username maksimal 20 karakter' }),
  email_address: z.string({ message: 'Email tidak valid' }),
  password: z
    .string()
    .min(8, { message: 'Kata sandi minimal 8 karakter' })
    .max(50, { message: 'Kata sandi maksimal 50 karakter' }),
});

// export const registerUserFormSchema = z
//   .object({
//     username: z
//       .string()
//       .min(3, { message: 'Username minimal 3 karakter' })
//       .max(20, { message: 'Username maksimal 20 karakter' })
//       .regex(/^[a-zA-Z0-9_]+$/, {
//         message: 'Username hanya boleh berisi huruf, angka, dan underscore',
//       }),
//     email_address: z.string({ message: 'Email tidak valid' }),
//     password: z
//       .string()
//       .min(8, { message: 'Kata sandi minimal 8 karakter' })
//       .max(50, { message: 'Kata sandi maksimal 50 karakter' })
//       .regex(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
//         {
//           message:
//             'Kata sandi harus mengandung huruf besar, huruf kecil, angka, dan karakter spesial',
//         }
//       ),
//     confirmPassword: z
//       .string()
//       .min(1, { message: 'Konfirmasi kata sandi diperlukan' }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: 'Kata sandi dan konfirmasi kata sandi tidak cocok',
//   });

export const loginUserFormSchema = z.object({
  username: z.string().min(3, { message: 'Username minimal 3 karakter' }),
  password: z
    .string()
    .min(8, { message: 'Kata sandi minimal 8 karakter' })
    .max(50, { message: 'Kata sandi maksimal 50 karakter' }),
});
