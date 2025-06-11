// src/lib/validators/contactFormSchema.ts
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Nama lengkap minimal 3 karakter.' })
    .max(100),
  email: z.string().email({ message: 'Format email tidak valid.' }),
  phone: z
    .string()
    .min(10, { message: 'Nomor telepon minimal 10 digit.' })
    .max(15, { message: 'Nomor telepon maksimal 15 digit.' })
    .regex(/^\+?[0-9\s-()]*$/, { message: 'Format nomor telepon tidak valid.' }) // Regex sederhana
    .optional() // Jadikan opsional jika tidak wajib
    .or(z.literal('')), // Izinkan string kosong jika opsional
  subject: z
    .string()
    .min(5, { message: 'Subjek minimal 5 karakter.' })
    .max(150),
  message: z
    .string()
    .min(20, { message: 'Pesan minimal 20 karakter.' })
    .max(1000, { message: 'Pesan maksimal 1000 karakter.' }),
  recaptchaToken: z
    .string()
    .min(1, { message: 'Mohon verifikasi bahwa Anda bukan robot.' }), // Tambahan untuk reCAPTCHA
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
