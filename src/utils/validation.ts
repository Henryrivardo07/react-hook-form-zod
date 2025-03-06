import { z } from "zod";

export const registrationSchema = z.object({
  firstName: z.string().min(5, "First name is required min 5 Characther"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  country: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .optional(), // Mengizinkan `undefined`
  terms: z.boolean().refine((val) => val === true, "You must accept the terms"),
});

export type FormData = z.infer<typeof registrationSchema>;
