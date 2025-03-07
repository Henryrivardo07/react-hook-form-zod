import { z } from "zod"; // Mengimpor pustaka Zod untuk validasi skema data

export const registrationSchema = z
  .object({
    // Validasi First Name (minimal 5 karakter)
    firstName: z.string().refine((val) => val.length >= 5, {
      message: "First name is required min 5 characters",
    }),

    // Validasi Last Name (minimal 1 karakter, tidak boleh kosong)
    lastName: z.string().refine((val) => val.length >= 1, {
      message: "Last name is required",
    }),

    // Validasi Email (harus sesuai format email menggunakan regex)
    email: z.string().refine((val) => /.+@.+\..+/.test(val), {
      message: "Invalid email address",
    }),

    // Validasi Password dengan beberapa aturan
    password: z
      .string()
      .refine((val) => val.length >= 8, {
        message: "Password must be at least 8 characters long", // Minimal 8 karakter
      })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password must contain at least one uppercase letter", // Harus ada huruf kapital
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Password must contain at least one number", // Harus ada angka
      })
      .refine((val) => /[^a-zA-Z0-9]/.test(val), {
        message: "Password must contain at least one special character", // Harus ada karakter spesial
      }),

    // Validasi Confirm Password (nanti dibandingkan dengan password)
    confirmPassword: z.string(),

    // Validasi Country (opsional, tetapi jika diisi harus berupa objek dengan value dan label)
    country: z
      .object({
        value: z.string(),
        label: z.string(),
      })
      .optional()
      .refine((val) => val === undefined || (val.value && val.label), {
        message: "Country must have a value and label",
      }),

    // Validasi Terms & Conditions (wajib dicentang / bernilai true)
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms",
    }),
  })
  // Validasi tambahan untuk memastikan password dan confirmPassword harus sama
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match", // Pesan error jika password tidak sama
        path: ["confirmPassword"], // Menampilkan error di field confirmPassword
      });
    }
  });

// Menentukan tipe FormData berdasarkan registrationSchema agar bisa digunakan dalam TypeScript
export type FormData = z.infer<typeof registrationSchema>;
