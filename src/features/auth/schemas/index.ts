import { z } from 'zod';

const allowedDomains = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'live.com',
];

// Membuat pola regex untuk domain yang diperbolehkan
const emailRegex = new RegExp(
  `^[a-zA-Z0-9._%+-]+@(${allowedDomains.join('|')})$`,
);

export const registerUserFormSchema = z.object({
  username: z
    .string()
    .min(6, { message: 'Username minimal 6 karakter' })
    .max(20, { message: 'Username maksimal 20 karakter' }),

  email_address: z
    .string({ message: 'Email tidak valid' })
    .email({ message: 'Email tidak valid' })
    .regex(emailRegex, {
      message:
        'Hanya email dengan domain Gmail, Yahoo, Hotmail, Outlook, atau Email yang valid.',
    }),

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
  username: z.string().min(6, { message: 'Username minimal 6 karakter' }),
  password: z
    .string()
    .min(8, { message: 'Kata sandi minimal 8 karakter' })
    .max(50, { message: 'Kata sandi maksimal 50 karakter' }),
});

export const updateUserFormSchema = z.object({
  id: z.string().optional(),
  avatar: z.string().optional().nullable(),
  // avatar: z.instanceof(File).optional().nullable(),
  username: z
    .string()
    .min(6, { message: 'Username minimal 6 karakter' })
    .max(20, { message: 'Username maksimal 20 karakter' }),
  email_address: z
    .string({ message: 'Email tidak valid' })
    .email({ message: 'Email tidak valid' })
    .regex(emailRegex, {
      message:
        'Hanya email dengan domain Gmail, Yahoo, Hotmail, Outlook, atau Email yang valid.',
    }),
  password: z
    .string()
    .min(8, { message: 'Kata sandi minimal 8 karakter' })
    .max(50, { message: 'Kata sandi maksimal 50 karakter' })
    .optional()
    .refine((val) => val === undefined || val.length >= 8, {
      message: 'Kata sandi minimal 8 karakter',
    }),
});
